/*
 * Bind this script to the Google Sheet receiving website inquiries.
 * Set Script Properties before deployment:
 * - SHEET_ID
 * - SHEET_NAME
 * - WEBHOOK_SECRET
 * - LEAD_RECIPIENTS (comma-separated email addresses)
 * - BOOKING_CALENDAR_ID (optional, defaults to primary)
 * - BOOKING_SHEET_NAME (optional, defaults to Bookings)
 * - BOOKING_RECIPIENTS (optional, defaults to LEAD_RECIPIENTS)
 *
 * To generate Google Meet links, enable the Advanced Google Service:
 * Services -> Calendar API -> Add
 */

function doPost(event) {
  var properties = PropertiesService.getScriptProperties();

  try {
    var payload = JSON.parse((event.postData && event.postData.contents) || "{}");
    var expectedSecret = properties.getProperty("WEBHOOK_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse({ ok: false, stored: false, error: "Unauthorized." });
    }

    if (payload.event === "booking.busy") {
      return handleBookingBusy(properties, payload);
    }

    if (payload.event === "booking.create") {
      return handleBookingCreate(properties, payload);
    }

    if (payload.event !== "contact.inquiry" || !isValidLead(payload.lead)) {
      return jsonResponse({ ok: false, stored: false, error: "Invalid payload." });
    }

    var sheet = getLeadSheet(properties);
    var lead = payload.lead;
    var receivedAt = payload.receivedAt || new Date().toISOString();
    var rowNumber = storeLead(sheet, receivedAt, lead);
    var recipients = properties.getProperty("LEAD_RECIPIENTS");

    if (!recipients) {
      sheet.getRange(rowNumber, 8).setValue("Stored - email recipients not configured");
      return jsonResponse({ ok: true, stored: true, notified: false });
    }

    try {
      MailApp.sendEmail({
        to: recipients,
        replyTo: lead.email,
        name: "MVPReady Website",
        subject: "New MVP inquiry - " + (lead.company || lead.name),
        body: leadEmailBody(receivedAt, lead),
      });
      sheet.getRange(rowNumber, 8).setValue("Email sent");
      return jsonResponse({ ok: true, stored: true, notified: true });
    } catch (emailError) {
      sheet.getRange(rowNumber, 8).setValue("Stored - email notification failed");
      return jsonResponse({ ok: true, stored: true, notified: false });
    }
  } catch (error) {
    return jsonResponse({ ok: false, stored: false, error: "Unable to process submission." });
  }
}

function handleBookingBusy(properties, payload) {
  var timeMin = new Date(payload.timeMin);
  var timeMax = new Date(payload.timeMax);

  if (isNaN(timeMin.getTime()) || isNaN(timeMax.getTime())) {
    return jsonResponse({ ok: false, error: "Invalid availability range." });
  }

  var calendar = getBookingCalendar(properties);
  var events = calendar.getEvents(timeMin, timeMax);
  var busy = events.map(function (event) {
    return {
      start: event.getStartTime().toISOString(),
      end: event.getEndTime().toISOString(),
    };
  });

  return jsonResponse({ ok: true, busy: busy });
}

function handleBookingCreate(properties, payload) {
  if (!isValidBooking(payload.booking)) {
    return jsonResponse({ ok: false, error: "Invalid booking payload." });
  }

  if (typeof Calendar === "undefined" || !Calendar.Events) {
    return jsonResponse({
      ok: false,
      error: "Advanced Calendar API is not enabled in Apps Script.",
    });
  }

  var booking = payload.booking;
  var calendarId = properties.getProperty("BOOKING_CALENDAR_ID") || "primary";
  var recipients = properties.getProperty("BOOKING_RECIPIENTS") || properties.getProperty("LEAD_RECIPIENTS") || "";
  var attendeeEmails = uniqueEmails([booking.email].concat(recipients.split(",")));
  var start = new Date(booking.start);
  var end = new Date(booking.end);
  var description = [
    "Free strategy call to discuss your startup idea and MVP requirements.",
    "",
    "Name: " + booking.name,
    "Email: " + booking.email,
    "Company: " + (booking.company || "Not provided"),
    "Visitor timezone: " + (booking.timeZone || "Not provided"),
  ].join("\n");

  var event = Calendar.Events.insert(
    {
      summary: "MVPReady Discovery Call",
      description: description,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
      attendees: attendeeEmails.map(function (email) {
        return { email: email };
      }),
      guestsCanInviteOthers: false,
      guestsCanModify: false,
      guestsCanSeeOtherGuests: true,
      reminders: { useDefault: true },
      conferenceData: {
        createRequest: {
          requestId: Utilities.getUuid(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
    calendarId,
    {
      conferenceDataVersion: 1,
      sendUpdates: "all",
    },
  );

  var meetLink = event.hangoutLink || getMeetEntryPoint(event);
  if (!meetLink) {
    return jsonResponse({ ok: false, error: "Google Meet link was not created." });
  }

  storeBooking(properties, booking, event, meetLink);

  return jsonResponse({
    ok: true,
    booking: {
      eventId: event.id,
      htmlLink: event.htmlLink,
      meetLink: meetLink,
      start: start.toISOString(),
      end: end.toISOString(),
    },
  });
}

function getLeadSheet(properties) {
  var spreadsheetId = properties.getProperty("SHEET_ID");
  var sheetName = properties.getProperty("SHEET_NAME") || "Leads";

  if (!spreadsheetId) {
    throw new Error("SHEET_ID is not configured.");
  }

  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
  var headers = [
    "Submitted at",
    "Name",
    "Email",
    "Company",
    "Budget range",
    "Product brief",
    "Source",
    "Notification status",
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function storeLead(sheet, receivedAt, lead) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    sheet.appendRow([
      cellValue(receivedAt),
      cellValue(lead.name),
      cellValue(lead.email),
      cellValue(lead.company || ""),
      cellValue(lead.budget || ""),
      cellValue(lead.message),
      cellValue(lead.source || "/contact"),
      "Stored - sending notification",
    ]);
    return sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }
}

function isValidLead(lead) {
  return (
    lead &&
    typeof lead.name === "string" &&
    lead.name.length > 0 &&
    typeof lead.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) &&
    typeof lead.message === "string" &&
    lead.message.length > 0
  );
}

function isValidBooking(booking) {
  if (!booking) return false;
  var start = new Date(booking.start);
  var end = new Date(booking.end);

  return (
    typeof booking.name === "string" &&
    booking.name.length > 0 &&
    typeof booking.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email) &&
    !isNaN(start.getTime()) &&
    !isNaN(end.getTime()) &&
    end.getTime() > start.getTime()
  );
}

function getBookingCalendar(properties) {
  var calendarId = properties.getProperty("BOOKING_CALENDAR_ID");
  return calendarId ? CalendarApp.getCalendarById(calendarId) : CalendarApp.getDefaultCalendar();
}

function getMeetEntryPoint(event) {
  var entryPoints = event.conferenceData && event.conferenceData.entryPoints;
  if (!entryPoints) return "";

  for (var index = 0; index < entryPoints.length; index += 1) {
    if (entryPoints[index].entryPointType === "video") {
      return entryPoints[index].uri || "";
    }
  }

  return "";
}

function storeBooking(properties, booking, event, meetLink) {
  var spreadsheetId = properties.getProperty("SHEET_ID");
  if (!spreadsheetId) return;

  var sheetName = properties.getProperty("BOOKING_SHEET_NAME") || "Bookings";
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
  var headers = [
    "Booked at",
    "Name",
    "Email",
    "Company",
    "Start",
    "End",
    "Timezone",
    "Meet link",
    "Calendar event",
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date().toISOString(),
    cellValue(booking.name),
    cellValue(booking.email),
    cellValue(booking.company || ""),
    cellValue(booking.start),
    cellValue(booking.end),
    cellValue(booking.timeZone || ""),
    cellValue(meetLink),
    cellValue(event.htmlLink || ""),
  ]);
}

function uniqueEmails(values) {
  var seen = {};
  return values
    .map(function (value) {
      return String(value || "").trim().toLowerCase();
    })
    .filter(function (email) {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || seen[email]) {
        return false;
      }
      seen[email] = true;
      return true;
    });
}

function cellValue(value) {
  var text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function leadEmailBody(receivedAt, lead) {
  return [
    "A new MVPReady startup inquiry was submitted through the website.",
    "",
    "Received: " + receivedAt,
    "Name: " + lead.name,
    "Email: " + lead.email,
    "Company: " + (lead.company || "Not provided"),
    "Budget range: " + (lead.budget || "Not provided"),
    "Source: " + (lead.source || "/contact"),
    "",
    "Product brief:",
    lead.message,
    "",
    "Reply directly to this email to respond to the founder.",
  ].join("\n");
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
