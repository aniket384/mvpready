# Contact Lead Delivery Setup

The website is implemented to store contact inquiries in Google Sheets and send an
email notification from the same Google account. A verified sending domain is not
required for this setup.

## Required Correction

The second notification address supplied was `sanskarawsthi98@gamil.com`.
Confirm whether it should be `sanskarawsthi98@gmail.com` before configuring
email delivery.

## Google Sheet

Target spreadsheet ID:

```text
1NGbvH0fR4OL1FiANFuIRP96eAoHHZB6Foba7YP-gPMs
```

The script creates or uses a tab named `Leads`.

## Configure Google Apps Script

1. Open the Google Sheet.
2. Select **Extensions > Apps Script**.
3. Replace the default script with the contents of
   `integrations/google-apps-script/contact-leads.gs`.
4. In Apps Script, open **Project Settings > Script Properties**.
5. Add these properties:

```text
SHEET_ID=1NGbvH0fR4OL1FiANFuIRP96eAoHHZB6Foba7YP-gPMs
SHEET_NAME=Leads
WEBHOOK_SECRET=<a long random secret>
LEAD_RECIPIENTS=aniketmishra384@gmail.com,<confirmed second email address>
```

6. Select **Deploy > New deployment > Web app**.
7. Set **Execute as** to `Me`.
8. Set access to `Anyone`.
9. Authorize Sheets and Mail permissions, then copy the Web App URL.

The web app is accessible publicly because the website must call it, but submissions
are rejected unless they include the `WEBHOOK_SECRET`.

## Configure The Website

Add these environment variables in Vercel, or in `.env.local` for local testing:

```env
NEXT_PUBLIC_SITE_URL=https://mvpready.dev
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=<the same long random secret>
```

Never commit the real webhook secret.

`NEXT_PUBLIC_SITE_URL` controls canonical links, metadata, structured data,
`robots.txt`, `sitemap.xml`, and `llms.txt`. Change it to the production custom
domain once that domain is connected. Do not publish a canonical domain that is
not serving this website.

The same Apps Script webhook can also power the native Google Calendar booking
modal. To enable booking from your personal Google account, open Apps Script
**Services** and add **Calendar API** as an Advanced Google Service. Then deploy
a new web app version after pasting the latest `contact-leads.gs`.

## Test Locally

An ignored `.env.local` file has been prepared in the project root. Replace the
empty values in that file with the Google Apps Script Web App URL and matching
secret:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=<the same WEBHOOK_SECRET stored in Apps Script>
```

Start the local website:

```bash
npm run dev
```

Open `http://localhost:3000/contact`. When both values are loaded, the form button
reads `Request a build review`. If it still reads `Prepare email brief`, restart the
development server after saving `.env.local`.

## Verification

Submit a form inquiry after deployment and confirm:

1. A new row appears in the `Leads` tab.
2. Column `Notification status` says `Email sent`.
3. Both configured inboxes receive the lead notification.

For booking verification:

1. Open any `Book Free Discovery Call` CTA.
2. Select an available slot.
3. Submit name and email.
4. Confirm a row appears in the `Bookings` tab.
5. Confirm a Google Calendar event and Google Meet link are created.
6. Confirm the founder receives the calendar invite.

If email sending fails after a row is stored, the submission remains in the sheet
and its notification status identifies the failure.
