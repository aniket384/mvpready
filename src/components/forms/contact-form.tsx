"use client";

import { useId, useState } from "react";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

export function ContactForm({ onlineSubmissionEnabled }: { onlineSubmissionEnabled: boolean }) {
  const statusId = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [emailFallback, setEmailFallback] = useState(
    `mailto:${siteConfig.links.email}?subject=MVP%20build%20inquiry`,
  );
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const company = String(formData.get("company") ?? "");
    const budget = String(formData.get("budget") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = company ? `MVP build inquiry - ${company}` : "MVP build inquiry";
    const contactLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      budget ? `Budget range: ${budget}` : "",
    ].filter((line) => line !== "");
    const emailBody = [...contactLines, "", "Product brief:", message].join("\n");

    setEmailFallback(
      `mailto:${siteConfig.links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`,
    );

    if (!onlineSubmissionEnabled) {
      window.location.href =
        `mailto:${siteConfig.links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string; message?: string }
        | null;

      if (response.ok) {
        setStatus("success");
        setStatusMessage(result?.message ?? "Brief received. We will reply with the clearest next step.");
      } else {
        setStatus("error");
        setStatusMessage(
          result?.error ??
            `Online submission is unavailable. Please email ${siteConfig.links.email} directly.`,
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage(`Online submission is unavailable. Please email ${siteConfig.links.email} directly.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      aria-busy={submitting}
      aria-describedby={statusMessage ? statusId : undefined}
      onSubmit={onSubmit}
      className="relative grid gap-5 rounded-lg border border-border bg-card p-6"
    >
      <FormField label="Name" htmlFor="contact-name">
        <Input id="contact-name" name="name" autoComplete="name" required disabled={submitting} />
      </FormField>
      <FormField label="Email" htmlFor="contact-email">
        <Input id="contact-email" name="email" type="email" autoComplete="email" required disabled={submitting} />
      </FormField>
      <FormField label="Company" htmlFor="contact-company">
        <Input id="contact-company" name="company" autoComplete="organization" disabled={submitting} />
      </FormField>
      <FormField label="Budget range" htmlFor="contact-budget">
        <Input id="contact-budget" name="budget" placeholder="Example: $25k-$75k" disabled={submitting} />
      </FormField>
      <FormField label="What are you building?" htmlFor="contact-message">
        <Textarea id="contact-message" name="message" required disabled={submitting} />
      </FormField>
      <input type="hidden" name="source" value="/contact" />
      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={submitting}>
        {submitting
          ? "Preparing brief..."
          : onlineSubmissionEnabled
            ? "Request a build review"
            : "Prepare email brief"}
      </Button>
      <p className="text-sm text-muted-foreground">
        {onlineSubmissionEnabled ? "Prefer email? " : "Your brief opens in your email app before sending. "}
        <a className="font-medium text-foreground underline underline-offset-4" href={`mailto:${siteConfig.links.email}?subject=MVP%20build%20inquiry`}>
          {siteConfig.links.email}
        </a>
      </p>
      {status === "success" && statusMessage ? (
        <p id={statusId} role="status" className="text-sm text-muted-foreground">{statusMessage}</p>
      ) : null}
      {status === "error" && statusMessage ? (
        <div id={statusId} role="alert" className="grid gap-3 text-sm">
          <p className="text-red-600">{statusMessage}</p>
          <a
            className="inline-flex w-fit items-center rounded-md border border-border px-4 py-2 font-medium text-foreground hover:bg-muted"
            href={emailFallback}
          >
            Send this brief by email
          </a>
        </div>
      ) : null}
    </form>
  );
}
