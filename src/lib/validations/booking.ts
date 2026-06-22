export type BookingPayload = {
  name: string;
  email: string;
  company?: string;
  start: string;
  timeZone: string;
  website?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateTimeZone(value: unknown) {
  const timeZone = typeof value === "string" && value.trim() ? value.trim() : "UTC";

  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return timeZone;
  } catch {
    return "UTC";
  }
}

export function validateBookingPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { valid: false, error: "Invalid request body." } as const;
  }

  const body = payload as Record<string, unknown>;
  const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const data: BookingPayload = {
    name: text(body.name),
    email: text(body.email).toLowerCase(),
    company: text(body.company) || undefined,
    start: text(body.start),
    timeZone: validateTimeZone(body.timeZone),
    website: text(body.website) || undefined,
  };

  if (data.website) {
    return { valid: false, error: "Unable to process this request." } as const;
  }

  if (!data.name || !data.email || !data.start) {
    return { valid: false, error: "Name, email, and meeting time are required." } as const;
  }

  if (!emailPattern.test(data.email) || data.email.length > 320) {
    return { valid: false, error: "A valid email is required." } as const;
  }

  if (data.name.length > 100 || (data.company?.length ?? 0) > 160) {
    return { valid: false, error: "One or more fields exceed the allowed length." } as const;
  }

  const startDate = new Date(data.start);
  if (Number.isNaN(startDate.getTime())) {
    return { valid: false, error: "A valid meeting time is required." } as const;
  }

  const leadTimeMs = 60 * 60 * 1000;
  if (startDate.getTime() < Date.now() + leadTimeMs) {
    return { valid: false, error: "Please choose a meeting time at least one hour from now." } as const;
  }

  return { valid: true, data, startDate } as const;
}
