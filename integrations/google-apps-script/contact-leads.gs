/*
 * Bind this script to the Google Sheet receiving website inquiries.
 * Set Script Properties before deployment:
 * - SHEET_ID
 * - SHEET_NAME
 * - WEBHOOK_SECRET
 * - LEAD_RECIPIENTS (comma-separated email addresses)
 */

function doPost(event) {
  var properties = PropertiesService.getScriptProperties();

  try {
    var payload = JSON.parse((event.postData && event.postData.contents) || "{}");
    var expectedSecret = properties.getProperty("WEBHOOK_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse({ ok: false, stored: false, error: "Unauthorized." });
    }

    if (payload.event !== "contact.inquiry" || !isValidLead(payload.lead)) {
      return jsonResponse({ ok: false, stored: false, error: "Invalid lead payload." });
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
        name: "Northstar Studio Website",
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

function cellValue(value) {
  var text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function leadEmailBody(receivedAt, lead) {
  return [
    "A new startup inquiry was submitted through the website.",
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
