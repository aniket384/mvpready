"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    setStatus(response.ok ? "success" : "error");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input aria-label="Email address" name="email" type="email" placeholder="founder@company.com" required />
      <Button type="submit">Subscribe</Button>
      {status === "success" ? <p className="text-sm text-muted-foreground">Subscribed.</p> : null}
      {status === "error" ? <p className="text-sm text-muted-foreground">Subscriptions are not currently open.</p> : null}
    </form>
  );
}
