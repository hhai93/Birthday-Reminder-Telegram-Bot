const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; // Replace with your Telegram bot token
const CHAT_ID = "YOUR_TELEGRAM_CHAT_ID"; // Replace with your Telegram chat ID

/**
 * Main function to check birthdays
 */
function checkBirthdays() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // Open the active spreadsheet
  const data = sheet.getDataRange().getValues(); // Get all data from the sheet
  const today = new Date(); // Current date
  const next7Days = new Date(today);
  next7Days.setDate(today.getDate() + 7); // Date 7 days from now

  data.slice(1).forEach(row => { // Skip the header row
    const name = row[1]; // Column "Full Name" (2nd column)
    const birthday = new Date(row[2]); // Column "Birthday" (3rd column)

    // Adjust birthday year to match current year for comparison
    birthday.setFullYear(today.getFullYear());

    // If birthday matches today
    if (isSameDay(today, birthday)) {
      sendTelegramMessage(`Today, ${formatDate(today)} is ${name}'s birthday! 🎉`);
    }
    // If birthday is exactly 7 days from now
    else if (isSameDay(next7Days, birthday)) {
      sendTelegramMessage(`7 days from now, on ${formatDate(next7Days)}, is ${name}'s birthday!`);
    }
  });
}

/**
 * Send a message via Telegram
 * @param {string} message - The message content
 */
function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: CHAT_ID,
    text: message
  };
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };
  UrlFetchApp.fetch(url, options);
}

/**
 * Compare two dates based on day and month
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} - True if same day and month
 */
function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth();
}

/**
 * Format a date to dd/mm/yyyy string
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

/**
 * Create a daily trigger to run at 7 AM
 */
function createDailyTrigger() {
  deleteAllTriggers(); // Remove old triggers to avoid duplicates
  ScriptApp.newTrigger("checkBirthdays") // Main function
    .timeBased()
    .atHour(7) // Run at 7 AM (UTC, adjust if needed)
    .everyDays(1) // Repeat daily
    .create();
}

/**
 * Delete all existing triggers in the project
 */
function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
}
