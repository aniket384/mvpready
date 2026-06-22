import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { deliverContactLead } from "@/lib/integrations/google-apps-script";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { validateContactPayload } from "@/lib/validations/contact";

export const runtime = "edge";

const maxBodyBytes = 16_384;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 5;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  const ip = getRequestIp(request);
  const rateLimit = checkRateLimit({
    key: `contact:${ip}`,
    limit: rateLimitMaxRequests,
    windowMs: rateLimitWindowMs,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes or email us directly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "JSON body required." }, { status: 415 });
  }

  if (contentLength > maxBodyBytes) {
    return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
  }

  const payload = await request.json().catch(() => null);
  const validation = validateContactPayload(payload);

  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  if (validation.data.website) {
    return NextResponse.json({ ok: true, message: "Lead received." });
  }

  const result = await deliverContactLead(validation.data);

  if (!result.delivered) {
    return NextResponse.json(
      {
        error:
          `Online submission is temporarily unavailable. Please email ${siteConfig.links.email} directly.`,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Brief received. We will reply with the clearest next step.",
  });
}
