export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  source?: string;
  website?: string;
};

export function validateContactPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { valid: false, error: "Invalid request body." } as const;
  }

  const body = payload as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const data: ContactPayload = {
    name: text(body.name),
    email: text(body.email),
    company: text(body.company) || undefined,
    budget: text(body.budget) || undefined,
    message: text(body.message),
    source: text(body.source) || undefined,
    website: text(body.website) || undefined,
  };

  if (!data.name || !data.email || !data.message) {
    return { valid: false, error: "Name, email, and message are required." } as const;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 320) {
    return { valid: false, error: "A valid email is required." } as const;
  }

  if (
    data.name.length > 100 ||
    (data.company?.length ?? 0) > 160 ||
    (data.budget?.length ?? 0) > 100 ||
    (data.source?.length ?? 0) > 200 ||
    data.message.length > 5000
  ) {
    return { valid: false, error: "One or more fields exceed the allowed length." } as const;
  }

  return { valid: true, data } as const;
}
