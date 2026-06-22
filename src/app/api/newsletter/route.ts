import { NextResponse } from "next/server";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";
import { validateNewsletterPayload } from "@/lib/validations/newsletter";

export const runtime = "edge";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  const rateLimit = checkRateLimit({
    key: `newsletter:${getRequestIp(request)}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "JSON body required." }, { status: 415 });
  }

  if (contentLength > 4096) {
    return NextResponse.json({ error: "Request body is too large." }, { status: 413 });
  }

  const payload = await request.json().catch(() => null);
  const validation = validateNewsletterPayload(payload);

  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  return NextResponse.json(
    { error: "Email subscriptions are not currently available." },
    { status: 503 },
  );
}
