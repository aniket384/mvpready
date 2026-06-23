import { createSign, randomUUID } from "crypto";
import "server-only";

import type { BookingPayload } from "@/lib/validations/booking";

const calendarApiBase = "https://www.googleapis.com/calendar/v3";
const tokenUrl = "https://oauth2.googleapis.com/token";
const calendarScope = "https://www.googleapis.com/auth/calendar";
const durationMinutes = 30;

export type BusyWindow = {
  start: string;
  end: string;
};

export type CreatedBooking = {
  eventId: string;
  htmlLink: string;
  meetLink: string;
  start: string;
  end: string;
};

export function isGoogleCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_CALENDAR_ID &&
      process.env.GOOGLE_CALENDAR_CLIENT_EMAIL &&
      process.env.GOOGLE_CALENDAR_PRIVATE_KEY,
  );
}

export function bookingNotificationEmail() {
  return process.env.GOOGLE_CALENDAR_NOTIFICATION_EMAIL ?? "hello@mvpready.dev";
}

function base64url(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function normalizePrivateKey(value: string) {
  const key = value
    .trim()
    .replace(/^"|"$/g, "")
    .replace(/^'|'$/g, "")
    .replace(/\\n/g, "\n")
    .trim();

  if (!key.includes("-----BEGIN PRIVATE KEY-----") || !key.includes("-----END PRIVATE KEY-----")) {
    throw new Error(
      "Invalid GOOGLE_CALENDAR_PRIVATE_KEY. Paste the full private_key value including BEGIN/END PRIVATE KEY lines.",
    );
  }

  return key;
}

async function getAccessToken() {
  const clientEmail = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_CALENDAR_PRIVATE_KEY
    ? normalizePrivateKey(process.env.GOOGLE_CALENDAR_PRIVATE_KEY)
    : "";

  if (!clientEmail || !privateKey) {
    throw new Error("Google Calendar service account credentials are not configured.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: calendarScope,
      aud: tokenUrl,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsignedToken = `${header}.${claim}`;
  let signature: Buffer;

  try {
    signature = createSign("RSA-SHA256").update(unsignedToken).sign(privateKey);
  } catch (error) {
    throw new Error(
      "Invalid GOOGLE_CALENDAR_PRIVATE_KEY. Remove JSON field names, trailing commas, and surrounding quotes; keep the full BEGIN/END PRIVATE KEY value.",
      { cause: error },
    );
  }

  const assertion = `${unsignedToken}.${base64url(signature)}`;

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const result = (await response.json().catch(() => null)) as { access_token?: string; error?: string } | null;

  if (!response.ok || !result?.access_token) {
    throw new Error(result?.error ?? "Unable to authenticate with Google Calendar.");
  }

  return result.access_token;
}

async function googleCalendarFetch<T>(path: string, init: RequestInit) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${calendarApiBase}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
      ...init.headers,
    },
  });

  const result = (await response.json().catch(() => null)) as T & { error?: { message?: string } };

  if (!response.ok) {
    throw new Error(result?.error?.message ?? "Google Calendar request failed.");
  }

  return result;
}

export async function getBusyWindows({ timeMin, timeMax }: { timeMin: Date; timeMax: Date }) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) throw new Error("GOOGLE_CALENDAR_ID is not configured.");

  const data = await googleCalendarFetch<{
    calendars?: Record<string, { busy?: BusyWindow[] }>;
  }>("/freeBusy", {
    method: "POST",
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: calendarId }],
    }),
  });

  return data.calendars?.[calendarId]?.busy ?? [];
}

export async function createDiscoveryCall({
  payload,
  startDate,
}: {
  payload: BookingPayload;
  startDate: Date;
}) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) throw new Error("GOOGLE_CALENDAR_ID is not configured.");

  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
  const descriptionLines = [
    "Free strategy call to discuss your startup idea and MVP requirements.",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : "",
    `Visitor timezone: ${payload.timeZone}`,
  ].filter(Boolean);

  const data = await googleCalendarFetch<{
    id?: string;
    htmlLink?: string;
    hangoutLink?: string;
    conferenceData?: { entryPoints?: Array<{ entryPointType?: string; uri?: string }> };
  }>(
    `/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1`,
    {
      method: "POST",
      body: JSON.stringify({
        summary: "MVPReady Discovery Call",
        description: descriptionLines.join("\n"),
        start: { dateTime: startDate.toISOString(), timeZone: "UTC" },
        end: { dateTime: endDate.toISOString(), timeZone: "UTC" },
        guestsCanInviteOthers: false,
        guestsCanModify: false,
        guestsCanSeeOtherGuests: true,
        reminders: { useDefault: true },
        conferenceData: {
          createRequest: {
            requestId: randomUUID(),
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      }),
    },
  );

  const meetLink =
    data.hangoutLink ??
    data.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri ??
    "";

  if (!data.id || !data.htmlLink || !meetLink) {
    throw new Error("Google Calendar created the event but did not return a meeting link.");
  }

  return {
    eventId: data.id,
    htmlLink: data.htmlLink,
    meetLink,
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  } satisfies CreatedBooking;
}
