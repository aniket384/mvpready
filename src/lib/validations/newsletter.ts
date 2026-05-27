export function validateNewsletterPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { valid: false, error: "Invalid request body." } as const;
  }

  const body = payload as { email?: string };

  if (!body.email || !body.email.includes("@")) {
    return { valid: false, error: "A valid email is required." } as const;
  }

  return { valid: true, data: { email: body.email } } as const;
}
