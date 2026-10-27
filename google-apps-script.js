/**
 * GOOGLE APPS SCRIPT — Paste this in your Google Sheet's Script Editor
 * 
 * Setup Steps:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Delete existing code, paste this entire file
 * 4. Click "Deploy" → "New Deployment"
 * 5. Type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy → Copy the Web App URL
 * 9. Paste that URL in your .env.local as GOOGLE_SHEETS_WEBHOOK_URL
 */

const SHEET_NAME = "Internship Applications"; // Change if your sheet tab has a different name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
      || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At",
        "Full Name",
        "Email",
        "Phone",
        "Gender",
        "Date of Birth",
        "Street",
        "City",
        "State",
        "Pincode",
        "College / University",
        "Course & Year",
        "Role Applied For",
        "Key Skills",
        "Portfolio / GitHub / LinkedIn",
        "Resume Link",
        "Preferred Start Date",
        "Weekly Availability",
        "Why Naiye Bharat?",
        "Status"
      ]);

      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, 20);
      headerRange.setBackground("#4C1D95");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);
    }

    // Append the new application row
    sheet.appendRow([
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.gender || "",
      data.dateOfBirth || "",
      data.street || "",
      data.city || "",
      data.state || "",
      data.pincode || "",
      data.college || "",
      data.courseYear || "",
      data.role || "",
      data.skills || "",
      data.portfolioUrl || "",
      data.resumeUrl || "",
      data.startDate || "",
      data.availability || "",
      data.motivation || "",
      "Pending"
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 20);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually to verify setup
function testSetup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log("Sheet name: " + sheet.getName());
  Logger.log("Setup OK!");
}
