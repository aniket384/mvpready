import { NextResponse } from "next/server";
import { bookingDurationMinutes, slotIsBusy } from "@/lib/booking/availability";
import {
  createDiscoveryCall,
  getBusyWindows,
  isGoogleCalendarConfigured,
} from "@/lib/google/calendar";
import {
  createAppsScriptDiscoveryCall,
  getAppsScriptBusyWindows,
  isGoogleBookingAppsScriptConfigured,
  isAppsScriptSetupError,
} from "@/lib/integrations/google-booking-apps-script";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { validateBookingPayload } from "@/lib/validations/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getRequestIp(request);
  const rateLimit = checkRateLimit({
    key: `booking-create:${ip}`,
    limit: 8,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Too many booking attempts. Please try again later." }, { status: 429 });
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

  const payload = (await request.json().catch(() => null)) as unknown;
  const validation = validateBookingPayload(payload);

  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const startDate = validation.startDate;
  const endDate = new Date(startDate.getTime() + bookingDurationMinutes * 60 * 1000);

  try {
    const busyRange = {
      timeMin: new Date(startDate.getTime() - 60 * 1000),
      timeMax: new Date(endDate.getTime() + 60 * 1000),
    };
    const busyWindows = isGoogleCalendarConfigured()
      ? await getBusyWindows(busyRange)
      : await getAppsScriptBusyWindows(busyRange);

    if (slotIsBusy(startDate, busyWindows)) {
      return NextResponse.json(
        { error: "That time was just booked. Please choose another slot." },
        { status: 409 },
      );
    }

    let booking;

    if (isGoogleBookingAppsScriptConfigured()) {
      try {
        booking = await createAppsScriptDiscoveryCall({
          payload: validation.data,
          startDate,
          durationMinutes: bookingDurationMinutes,
        });
      } catch (appsScriptError) {
        if (isAppsScriptSetupError(appsScriptError)) throw appsScriptError;
        if (!isGoogleCalendarConfigured()) throw appsScriptError;
        console.error("Apps Script booking failed; falling back to service account", appsScriptError);
      }
    }

    booking ??= await createDiscoveryCall({
      payload: validation.data,
      startDate,
    });

    return NextResponse.json({
      message: "Your MVPReady discovery call is booked.",
      booking,
    });
  } catch (error) {
    console.error("Booking creation failed", error);
    const setupError =
      isAppsScriptSetupError(error) ||
      (error instanceof Error && /google meet|conference type/i.test(error.message));

    return NextResponse.json(
      {
        error: setupError
          ? "Booking setup needs one final update: redeploy the latest Apps Script web app version with Calendar API enabled, then redeploy Vercel. Until then, email hello@mvpready.dev to schedule the call."
          : "We could not create the calendar invite. Please try another time or email hello@mvpready.dev.",
      },
      { status: 502 },
    );
  }
}
