# MVPReady Google Calendar Booking Setup

This project uses a native booking modal backed by Google Calendar and Google Meet. It does not use Calendly or Cal.com.

There are two supported modes. The app uses the service account when its variables are configured. Otherwise, it falls back to the existing Google Apps Script webhook.

## Option A: Existing Apps Script Webhook

Use this when you want bookings created from your personal Google account.

Required Vercel variables:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=<same secret as Apps Script WEBHOOK_SECRET>
```

No extra Vercel variable is required if those already exist.

Then update your Apps Script project with:

```text
integrations/google-apps-script/contact-leads.gs
```

In Apps Script:

1. Paste the latest script code.
2. Open **Services**.
3. Add **Calendar API** as an Advanced Google Service.
4. Keep these Script Properties:
   - `SHEET_ID`
   - `SHEET_NAME`
   - `WEBHOOK_SECRET`
   - `LEAD_RECIPIENTS`
5. Optional Script Properties:
   - `BOOKING_CALENDAR_ID` if you do not want to use your primary calendar.
   - `BOOKING_SHEET_NAME`, default `Bookings`.
   - `BOOKING_RECIPIENTS`, default uses `LEAD_RECIPIENTS`.
6. Deploy a new web app version.
7. Keep access as **Anyone**.

The same webhook handles lead storage, availability, booking creation, Google Meet link generation, and Calendar invitations.

## Option B: Service Account

Use this for a dedicated production calendar.

### Required Vercel Environment Variables

```env
GOOGLE_CALENDAR_ID=
GOOGLE_CALENDAR_CLIENT_EMAIL=
GOOGLE_CALENDAR_PRIVATE_KEY=
GOOGLE_CALENDAR_NOTIFICATION_EMAIL=hello@mvpready.dev
```

Keep these variables private. Do not prefix them with `NEXT_PUBLIC_`.

### Google Cloud Setup

1. Create or open a Google Cloud project.
2. Enable the Google Calendar API.
3. Create a service account.
4. Create a JSON key for that service account.
5. Copy these fields from the JSON key:
   - `client_email` -> `GOOGLE_CALENDAR_CLIENT_EMAIL`
   - `private_key` -> `GOOGLE_CALENDAR_PRIVATE_KEY`
6. In Google Calendar, open the calendar that should receive bookings.
7. Go to calendar settings, then share it with the service account `client_email`.
8. Grant `Make changes to events`.
9. Copy the calendar ID from calendar settings and set it as `GOOGLE_CALENDAR_ID`.

### Private Key Format

In Vercel, paste the private key with escaped newlines:

```env
GOOGLE_CALENDAR_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

The app converts `\n` back into real newlines on the server.

## Booking Behavior

- Visitors see slots in their local timezone.
- The meeting duration is 30 minutes.
- The event title is `MVPReady Discovery Call`.
- Google Calendar creates the Google Meet link.
- Calendar invites are sent to the founder and `GOOGLE_CALENDAR_NOTIFICATION_EMAIL`.
- If neither service account nor Apps Script booking is configured, the modal shows an email fallback instead of failing silently.

## Local Testing

The Playwright suite mocks `/api/booking/availability` and `/api/booking/book`, so CI does not need real Google credentials.

To test against the real API locally, add either the Apps Script webhook variables or the service account variables to `.env.local`, restart the dev server, and book a test slot through the website.
