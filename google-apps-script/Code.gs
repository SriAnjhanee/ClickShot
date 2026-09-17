const SHEET_NAME = 'Bookings';
const EMAIL_API_URL = 'https://emailvalidation.abstractapi.com/v1/';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');

    if (payload.action !== 'submitBooking') {
      return jsonResponse({ ok: false, message: 'Unsupported request.' }, 400);
    }

    const emailResult = verifyEmail(payload.email);
    if (!emailResult.ok) {
      return jsonResponse({ ok: false, type: 'email', message: emailResult.message }, 422);
    }

    saveBooking(payload);
    return jsonResponse({ ok: true, message: 'Booking submitted successfully.' });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: 'Unable to process the booking.' }, 500);
  }
}

function verifyEmail(email) {
  const normalizedEmail = String(email || '').trim();
  const apiKey = PropertiesService.getScriptProperties().getProperty('EMAIL_VERIFICATION_API_KEY');

  if (!apiKey) {
    throw new Error('Missing EMAIL_VERIFICATION_API_KEY Script Property.');
  }

  const response = UrlFetchApp.fetch(
    EMAIL_API_URL + '?api_key=' + encodeURIComponent(apiKey) + '&email=' + encodeURIComponent(normalizedEmail),
    { muteHttpExceptions: true }
  );
  const statusCode = response.getResponseCode();
  const result = JSON.parse(response.getContentText() || '{}');

  if (statusCode < 200 || statusCode >= 300 || result.error) {
    throw new Error('Email verification provider failed.');
  }

  const formatValid = result.is_valid_format && result.is_valid_format.value === true;
  const mxFound = result.is_mx_found && result.is_mx_found.value === true;
  const smtpValid = result.is_smtp_valid && result.is_smtp_valid.value === true;
  const disposable = result.is_disposable_email && result.is_disposable_email.value === true;
  const deliverable = result.deliverability === 'DELIVERABLE';

  if (!formatValid || !mxFound || !smtpValid || disposable || !deliverable) {
    return {
      ok: false,
      message: 'This email could not be verified as deliverable. Please use an active email address.',
    };
  }

  return { ok: true };
}

function saveBooking(payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Full Name', 'Phone', 'Email', 'Shoot Type', 'Event Date', 'Preferred Call Time', 'Venue', 'Message']);
  }

  sheet.appendRow([
    new Date(),
    payload.fullName || '',
    payload.phone || '',
    payload.email || '',
    payload.shootType || '',
    payload.eventDate || '',
    payload.preferredTime || 'Anytime',
    payload.venue || '',
    payload.message || '',
  ]);
}

function jsonResponse(body, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify({ ...body, statusCode: statusCode || 200 }))
    .setMimeType(ContentService.MimeType.JSON);
}
