import type { BusyWindow } from "@/lib/google/calendar";
import { validateTimeZone } from "@/lib/validations/booking";

export const bookingDurationMinutes = 30;
const bookingWindowDays = 14;
const dayStartHour = 9;
const dayEndHour = 17;

export type BookingSlot = {
  start: string;
  end: string;
  date: string;
  dateLabel: string;
  timeLabel: string;
  weekdayLabel: string;
  timeZone: string;
};

export type BookingDay = {
  date: string;
  label: string;
  slots: BookingSlot[];
};

type DateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function getZonedParts(date: Date, timeZone: string): DateParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const hour = value("hour");

  return {
    year: value("year"),
    month: value("month"),
    day: value("day"),
    hour: hour === 24 ? 0 : hour,
    minute: value("minute"),
    second: value("second"),
  };
}

function getOffsetMs(date: Date, timeZone: string) {
  const parts = getZonedParts(date, timeZone);
  const utcFromZoned = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );

  return utcFromZoned - date.getTime();
}

function zonedTimeToUtc({
  year,
  month,
  day,
  hour,
  minute,
  timeZone,
}: {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  timeZone: string;
}) {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const offset = getOffsetMs(utcGuess, timeZone);
  return new Date(utcGuess.getTime() - offset);
}

function dateKey({ year, month, day }: Pick<DateParts, "year" | "month" | "day">) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function overlapsBusyWindow(start: Date, end: Date, busyWindows: BusyWindow[]) {
  return busyWindows.some((busy) => {
    const busyStart = new Date(busy.start);
    const busyEnd = new Date(busy.end);
    return start < busyEnd && end > busyStart;
  });
}

function formatSlot(start: Date, end: Date, timeZone: string) {
  const weekdayLabel = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
  }).format(start);
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    timeZone,
    month: "short",
    day: "numeric",
  }).format(start);
  const timeLabel = `${new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(start)} - ${new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(end)}`;

  return { weekdayLabel, dateLabel, timeLabel };
}

export function buildAvailability({
  busyWindows,
  requestedTimeZone,
  now = new Date(),
}: {
  busyWindows: BusyWindow[];
  requestedTimeZone: string;
  now?: Date;
}) {
  const timeZone = validateTimeZone(requestedTimeZone);
  const leadTime = new Date(now.getTime() + 60 * 60 * 1000);
  const generatedDates = new Set<string>();
  const days = new Map<string, BookingDay>();

  for (let offset = 0; offset <= bookingWindowDays + 1; offset += 1) {
    const probe = new Date(now.getTime() + offset * 24 * 60 * 60 * 1000);
    const parts = getZonedParts(probe, timeZone);
    const key = dateKey(parts);
    if (generatedDates.has(key)) continue;
    generatedDates.add(key);

    const dayOfWeek = new Date(
      Date.UTC(parts.year, parts.month - 1, parts.day, 12, 0, 0),
    ).getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    const slots: BookingSlot[] = [];
    for (let hour = dayStartHour; hour < dayEndHour; hour += 1) {
      for (const minute of [0, 30]) {
        const start = zonedTimeToUtc({
          year: parts.year,
          month: parts.month,
          day: parts.day,
          hour,
          minute,
          timeZone,
        });
        const end = new Date(start.getTime() + bookingDurationMinutes * 60 * 1000);
        if (end.getTime() > zonedTimeToUtc({
          year: parts.year,
          month: parts.month,
          day: parts.day,
          hour: dayEndHour,
          minute: 0,
          timeZone,
        }).getTime()) {
          continue;
        }
        if (start < leadTime || overlapsBusyWindow(start, end, busyWindows)) continue;

        const labels = formatSlot(start, end, timeZone);
        slots.push({
          start: start.toISOString(),
          end: end.toISOString(),
          date: key,
          dateLabel: labels.dateLabel,
          timeLabel: labels.timeLabel,
          weekdayLabel: labels.weekdayLabel,
          timeZone,
        });
      }
    }

    if (slots.length > 0) {
      days.set(key, {
        date: key,
        label: `${slots[0].weekdayLabel}, ${slots[0].dateLabel}`,
        slots,
      });
    }

    if (days.size >= 10) break;
  }

  return {
    timeZone,
    durationMinutes: bookingDurationMinutes,
    days: Array.from(days.values()),
  };
}

export function availabilityRange(now = new Date()) {
  return {
    timeMin: now,
    timeMax: new Date(now.getTime() + (bookingWindowDays + 2) * 24 * 60 * 60 * 1000),
  };
}

export function slotIsBusy(start: Date, busyWindows: BusyWindow[]) {
  const end = new Date(start.getTime() + bookingDurationMinutes * 60 * 1000);
  return overlapsBusyWindow(start, end, busyWindows);
}
