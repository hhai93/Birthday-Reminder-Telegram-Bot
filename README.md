# Birthday Reminder Telegram Bot

This Telegram bot, built with **Google Apps Script**, automatically checks birthdays from a Google Sheets file and sends notifications via Telegram. The bot will:
- Notify if today is someone's birthday.
- Send a reminder 7 days before an upcoming birthday.

---

## :sparkles: Features
- Checks a list of birthdays from Google Sheets.
- Sends Telegram messages daily at 7 AM (customizable).
- Supports notifications for birthdays today and reminders 7 days in advance.

---

## :gear: Requirements
1. **Google Sheets**: A spreadsheet containing the birthday list.
2. **Telegram Bot**: A bot token from BotFather.
3. **Google Apps Script**: To deploy the script.

---

## :memo: Google Sheets Structure
The spreadsheet should follow this format:

| No. | Full Name    | Birthday   |
|-----|--------------|------------|
| 1   | John Doe     | 15/03/1990 |
| 2   | Jane Smith   | 22/07/1985 |

- **Column 1**: Serial number (optional).
- **Column 2**: Full Name.
- **Column 3**: Birthday (format: `dd/mm/yyyy`).

---

## :rocket: Setup Instructions

### Step 1: Create a Telegram Bot
1. Open Telegram and search for `@BotFather`.
2. Send `/newbot` and follow the prompts to create your bot.
3. Copy the **BOT_TOKEN** provided (e.g., `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`).
4. Send a message to your bot to activate it, then retrieve the **CHAT_ID**:
   - Use the URL: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`.
   - Look for `chat.id` in the response.

### Step 2: Prepare Google Sheets
1. Create a Google Sheets file with the structure shown above.
2. Add names and birthdays to the sheet.

### Step 3: Deploy Google Apps Script
1. Open your Google Sheets file.
2. Go to **Extensions > Apps Script**.
3. Paste the code from `script.gs` into the editor.
4. Replace the following values:
   - `BOT_TOKEN`: Insert your Telegram bot token.
   - `CHAT_ID`: Insert your chat ID.
5. Save the project (name it anything you like).

### Step 4: Set Up a Daily Trigger
1. In Apps Script, run the `createDailyTrigger()` function once to set up the trigger.
2. Check the **Triggers** tab (clock icon) to confirm the trigger is set to run at 7 AM daily (UTC).
   - **Note**: Adjust `.atHour(7)` if you want a different time zone (e.g., for UTC+7, use `.atHour(0)`).

### Step 5: Test the Bot
- Add a birthday matching today or 7 days from now in the Google Sheets.
- Manually run the `checkBirthdays()` function to verify the bot sends a Telegram message.

---

## :bulb: How It Works
- Every day at 7 AM (UTC), the script checks the Google Sheets file.
- If it finds a birthday today or 7 days from now, it sends a notification via Telegram.

---

## :warning: Notes
- The default trigger time is in UTC. To adjust to your local time (e.g., UTC+7), modify `.atHour(7)` in `createDailyTrigger()` to your desired hour.
- Ensure Google Sheets and Apps Script have internet access permissions.
