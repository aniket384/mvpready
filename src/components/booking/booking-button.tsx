"use client";

import { CalendarDays, CheckCircle2, Loader2, X } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

type BookingButtonProps = {
  children?: React.ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type BookingSlot = {
  start: string;
  end: string;
  date: string;
  dateLabel: string;
  timeLabel: string;
  weekdayLabel: string;
  timeZone: string;
};

type BookingDay = {
  date: string;
  label: string;
  slots: BookingSlot[];
};

type AvailabilityResponse = {
  timeZone: string;
  durationMinutes: number;
  days: BookingDay[];
  error?: string;
};

type BookingResponse = {
  message?: string;
  booking?: {
    eventId: string;
    htmlLink: string;
    meetLink: string;
    start: string;
    end: string;
  };
  error?: string;
};

export function BookingButton({
  children = "Book Free Discovery Call",
  className,
  size = "md",
  variant = "primary",
}: BookingButtonProps) {
  const [open, setOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const modal = open ? <BookingModal onClose={() => setOpen(false)} /> : null;

  return (
    <>
      <Button
        type="button"
        size={size}
        variant={variant}
        className={className}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <CalendarDays size={17} />
        {children}
      </Button>
      {modal && portalRoot ? createPortal(modal, portalRoot) : modal}
    </>
  );
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const descriptionId = useId();
  const statusId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<Element | null>(null);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<BookingResponse["booking"] | null>(null);

  const visitorTimeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
      return "UTC";
    }
  }, []);

  const activeDay = availability?.days.find((day) => day.date === selectedDate) ?? availability?.days[0];

  const closeModal = useCallback(() => {
    if (previousFocusRef.current instanceof HTMLElement) {
      previousFocusRef.current.focus();
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 0);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal]);

  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      setLoadingAvailability(true);
      setError("");

      try {
        const response = await fetch(
          `/api/booking/availability?timeZone=${encodeURIComponent(visitorTimeZone)}`,
        );
        const result = (await response.json().catch(() => null)) as AvailabilityResponse | null;

        if (cancelled) return;

        if (!response.ok || !result) {
          setError(result?.error ?? "Availability is temporarily unavailable.");
          return;
        }

        setAvailability(result);
        setSelectedDate(result.days[0]?.date ?? null);
        if (result.days.length === 0) {
          setError("No discovery call slots are currently available. Please email hello@mvpready.dev.");
        }
      } catch {
        if (!cancelled) setError("Availability is temporarily unavailable. Please email hello@mvpready.dev.");
      } finally {
        if (!cancelled) setLoadingAvailability(false);
      }
    }

    loadAvailability();
    return () => {
      cancelled = true;
    };
  }, [visitorTimeZone]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) {
      setError("Choose a meeting time first.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      website: String(formData.get("website") ?? ""),
      start: selectedSlot.start,
      timeZone: availability?.timeZone ?? visitorTimeZone,
    };

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/booking/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as BookingResponse | null;

      if (!response.ok || !result?.booking) {
        setError(result?.error ?? "We could not book that slot. Please choose another time.");
        return;
      }

      setSuccess(result.booking);
    } catch {
      setError("We could not book that slot. Please email hello@mvpready.dev.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto" role="presentation" data-booking-portal>
      <button
        type="button"
        aria-label="Close booking modal"
        onClick={closeModal}
        className="fixed inset-0 bg-background/70 backdrop-blur-md"
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-border bg-background shadow-2xl shadow-black/20 dark:shadow-black/50"
        >
          <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                Google Meet discovery call
              </p>
              <h2 id={titleId} className="mt-2 text-2xl font-medium sm:text-3xl">
                Book a free MVP strategy call.
              </h2>
              <p id={descriptionId} className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Choose a 30-minute slot in your local timezone. You will receive a Google Calendar invite with a Meet link.
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={closeModal}
              aria-label="Close booking modal"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {success ? (
            <div className="grid gap-6 p-6 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-medium">Your call is booked.</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  A Google Calendar invitation and Google Meet link have been sent to your email. The MVPReady team has also been notified.
                </p>
              </div>
              <div className="grid gap-3 rounded-lg border border-border bg-muted/35 p-4 text-sm">
                <p>
                  <span className="font-medium text-foreground">Meeting:</span>{" "}
                  {selectedSlot?.dateLabel}, {selectedSlot?.timeLabel}
                </p>
                <a
                  href={success.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Open Google Meet
                </a>
              </div>
              <Button type="button" className="w-full sm:w-fit" onClick={closeModal}>
                Done
              </Button>
            </div>
          ) : (
            <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="border-b border-border p-5 sm:p-6 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Select a time</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Displayed in {availability?.timeZone ?? visitorTimeZone}
                    </p>
                  </div>
                  {loadingAvailability ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : null}
                </div>

                {loadingAvailability ? <AvailabilitySkeleton /> : null}

                {!loadingAvailability && availability?.days.length ? (
                  <div className="mt-5">
                    <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Available dates">
                      {availability.days.map((day) => (
                        <button
                          key={day.date}
                          type="button"
                          onClick={() => {
                            setSelectedDate(day.date);
                            setSelectedSlot(null);
                          }}
                          className={cn(
                            "min-w-28 rounded-md border px-3 py-2 text-left text-sm transition-colors",
                            activeDay?.date === day.date
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground",
                          )}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 grid max-h-80 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                      {activeDay?.slots.map((slot) => (
                        <button
                          key={slot.start}
                          type="button"
                          aria-pressed={selectedSlot?.start === slot.start}
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "rounded-md border px-3 py-3 text-left text-sm transition-colors",
                            selectedSlot?.start === slot.start
                              ? "border-accent bg-accent/10 text-foreground"
                              : "border-border text-muted-foreground hover:border-foreground/25 hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {slot.timeLabel}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <form onSubmit={onSubmit} className="grid content-start gap-4 p-5 sm:p-6">
                <div>
                  <h3 className="font-medium">Your details</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    We use this only for the calendar invite and call context.
                  </p>
                </div>
                <FormField label="Name" htmlFor="booking-name">
                  <Input id="booking-name" name="name" autoComplete="name" required disabled={submitting} />
                </FormField>
                <FormField label="Email" htmlFor="booking-email">
                  <Input
                    id="booking-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={submitting}
                  />
                </FormField>
                <FormField label="Company (optional)" htmlFor="booking-company">
                  <Input
                    id="booking-company"
                    name="company"
                    autoComplete="organization"
                    disabled={submitting}
                  />
                </FormField>
                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label htmlFor="booking-website">Leave this field empty</label>
                  <input id="booking-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                {selectedSlot ? (
                  <p className="rounded-md border border-border bg-muted/35 p-3 text-sm text-muted-foreground">
                    Selected: <span className="font-medium text-foreground">{selectedSlot.dateLabel}</span>,{" "}
                    {selectedSlot.timeLabel}
                  </p>
                ) : (
                  <p className="rounded-md border border-border bg-muted/35 p-3 text-sm text-muted-foreground">
                    Choose a time to continue.
                  </p>
                )}
                {error ? (
                  <p id={statusId} role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                ) : null}
                <Button type="submit" disabled={!selectedSlot || submitting || loadingAvailability}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating invite...
                    </>
                  ) : (
                    "Confirm Google Meet"
                  )}
                </Button>
                <p className="text-xs leading-5 text-muted-foreground">
                  Calendar invites are sent automatically. If the slot disappears, choose another available time.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AvailabilitySkeleton() {
  return (
    <div className="mt-5 grid gap-4" aria-hidden="true">
      <div className="flex gap-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-12 w-28 animate-pulse rounded-md bg-muted" />
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="h-12 animate-pulse rounded-md bg-muted" />
        ))}
      </div>
    </div>
  );
}
