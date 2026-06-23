import { NextResponse } from "next/server";
import { availabilityRange, buildAvailability } from "@/lib/booking/availability";
import { getBusyWindows, isGoogleCalendarConfigured } from "@/lib/google/calendar";
import {
  getAppsScriptBusyWindows,
  isGoogleBookingAppsScriptConfigured,
  isAppsScriptSetupError,
} from "@/lib/integrations/google-booking-apps-script";
import { getRequestIp, checkRateLimit } from "@/lib/security/rate-limit";
import { validateTimeZone } from "@/lib/validations/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const ip = getRequestIp(request);
  const rateLimit = checkRateLimit({
    key: `booking-availability:${ip}`,
    limit: 60,
    windowMs: 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  if (!isGoogleCalendarConfigured() && !isGoogleBookingAppsScriptConfigured()) {
    return NextResponse.json(
      {
        error:
          "Booking is not configured yet. Please email hello@mvpready.dev to schedule a discovery call.",
      },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const timeZone = validateTimeZone(url.searchParams.get("timeZone"));
  const range = availabilityRange();

  try {
    let busyWindows;

    if (isGoogleBookingAppsScriptConfigured()) {
      try {
        busyWindows = await getAppsScriptBusyWindows(range);
      } catch (appsScriptError) {
        if (isAppsScriptSetupError(appsScriptError)) throw appsScriptError;
        if (!isGoogleCalendarConfigured()) throw appsScriptError;
        console.error("Apps Script availability failed; falling back to service account", appsScriptError);
      }
    }

    busyWindows ??= await getBusyWindows(range);

    return NextResponse.json(buildAvailability({ busyWindows, requestedTimeZone: timeZone }));
  } catch (error) {
    console.error("Booking availability failed", error);
    const setupError = isAppsScriptSetupError(error);

    return NextResponse.json(
      {
        error: setupError
          ? "Booking setup needs one final update: redeploy the latest Apps Script web app version with Calendar API enabled."
          : "Availability is temporarily unavailable. Please email hello@mvpready.dev to schedule a discovery call.",
      },
      { status: 502 },
    );
  }
}
