import { NextResponse } from "next/server";
import { validateNewsletterPayload } from "@/lib/validations/newsletter";

export const runtime = "edge";

export async function POST(request: Request) {
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
