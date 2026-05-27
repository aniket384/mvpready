import type { ContactPayload } from "@/lib/validations/contact";

type DeliveryResponse = {
  ok?: boolean;
  stored?: boolean;
  notified?: boolean;
};

export async function deliverContactLead(lead: ContactPayload) {
  const endpoint = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!endpoint || !secret) {
    return { delivered: false as const, reason: "not_configured" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        secret,
        event: "contact.inquiry",
        receivedAt: new Date().toISOString(),
        lead,
      }),
    });
    const result = (await response.json().catch(() => null)) as DeliveryResponse | null;

    if (!response.ok || !result?.ok || !result.stored) {
      return { delivered: false as const, reason: "delivery_failed" };
    }

    return { delivered: true as const, notified: Boolean(result.notified) };
  } catch {
    return { delivered: false as const, reason: "delivery_failed" };
  }
}
