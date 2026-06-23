import "server-only";

import type { BusyWindow, CreatedBooking } from "@/lib/google/calendar";
import type { BookingPayload } from "@/lib/validations/booking";

type AppsScriptResponse<T> = T & {
  ok?: boolean;
  error?: string;
};

function bookingWebhookUrl() {
  return process.env.GOOGLE_BOOKING_WEBHOOK_URL ?? process.env.GOOGLE_SHEETS_WEBHOOK_URL;
}

function bookingWebhookSecret() {
  return process.env.GOOGLE_BOOKING_WEBHOOK_SECRET ?? process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
}

export function isGoogleBookingAppsScriptConfigured() {
  return Boolean(bookingWebhookUrl() && bookingWebhookSecret());
}

async function postBookingWebhook<T>(body: Record<string, unknown>) {
  const endpoint = bookingWebhookUrl();
  const secret = bookingWebhookSecret();

  if (!endpoint || !secret) {
    throw new Error("Google Apps Script booking webhook is not configured.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      ...body,
      secret,
      sentAt: new Date().toISOString(),
    }),
  });

  const result = (await response.json().catch(() => null)) as AppsScriptResponse<T> | null;

  if (!response.ok || !result?.ok) {
    throw new Error(result?.error ?? "Google Apps Script booking webhook failed.");
  }

  return result;
}

export async function getAppsScriptBusyWindows({
  timeMin,
  timeMax,
}: {
  timeMin: Date;
  timeMax: Date;
}) {
  const result = await postBookingWebhook<{ busy?: BusyWindow[] }>({
    event: "booking.busy",
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
  });

  return result.busy ?? [];
}

export async function createAppsScriptDiscoveryCall({
  payload,
  startDate,
  durationMinutes,
}: {
  payload: BookingPayload;
  startDate: Date;
  durationMinutes: number;
}) {
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
  const result = await postBookingWebhook<{ booking?: CreatedBooking }>({
    event: "booking.create",
    booking: {
      name: payload.name,
      email: payload.email,
      company: payload.company ?? "",
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      timeZone: payload.timeZone,
    },
  });

  if (!result.booking?.eventId || !result.booking.meetLink) {
    throw new Error("Google Apps Script did not return a Google Meet booking.");
  }

  return result.booking;
}
