import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { deliverContactLead } from "@/lib/integrations/google-apps-script";
import { validateContactPayload } from "@/lib/validations/contact";

export const runtime = "edge";

export async function POST(request: Request) {
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
