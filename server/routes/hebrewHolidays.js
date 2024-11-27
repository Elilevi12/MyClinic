const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const cron = require("node-cron");

const today = new Date();


const startDate = today.toISOString().split('T')[0];  // תאריך ההתחלה (היום)

const nextYear = new Date(today);
nextYear.setFullYear(today.getFullYear() + 1);
const endDate = nextYear.toISOString().split('T')[0]; 

// פונקציה לשליפת חגים
const fetchHebrewHolidays = async () => {
  const url =
    `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&min=off&mod=on&nx=on&mf=off&lg=h&nx=off&start=${startDate}&end=${endDate}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const holidays = data.items
        .filter(
          (item) =>
            !item.title.startsWith("סיגד") &&
            !item.title.startsWith("יוֹם הַעֲלִיָּה") &&
            !item.title.startsWith("שִׂמְחַת תּוֹרָה") &&
            !item.title.startsWith("חֲנוּכָּה") &&
            !item.title.startsWith("יוֹם הַשּׁוֹאָה") &&
            !item.title.startsWith("יוֹם הַזִּכָּרוֹן") &&
            !item.title.startsWith("יוֹם יְרוּשָׁלַיִם") &&
            !item.title.startsWith("שָׁבוּעוֹת ב") &&
            !item.title.startsWith("פֶּסַח ח") &&
            !item.title.startsWith("עֶרֶב פּוּרִים")
        )
        .map((item) => ({
          date: item.date,
          holiday: item.title,
        }));

      return holidays;
    } else {
      console.log("לא נמצאו חגים");
      return [];
    }
  } catch (error) {
    console.error("אירעה שגיאה בעת שליפת החגים:", error);
    return [];
  }
};

// פונקציה לשמירת חגים במסד הנתונים
const saveHolidaysToDatabase = async () => {
  const holidays = await fetchHebrewHolidays(); // משתמש ב-await כדי לקבל את המידע מהפונקציה
  const sql1 = "DELETE FROM hebrew_holidays";
  db.query(sql1, (err, result) => {
    if (err) {
      console.error("שגיאה במחיקת החגים ממסד הנתונים:", err);
    } else {
      console.log("החגים נמחקו בהצלחה");
    }
  });

  const sql2 = `REPLACE INTO hebrew_holidays (date, title) VALUES (?, ?)`;
  console.log(holidays);

  holidays.forEach((holiday) => {
    db.query(sql2, [holiday.date, holiday.holiday], (err, result) => {
      if (err) {
        console.error("שגיאה בשמירת החגים במסד הנתונים:", err);
      } else {
        console.log(`החג ${holiday.holiday} נשמר בהצלחה`);
      }
    });
  });
};

// הגדרת משימת CRON לביצוע פעם בחודש (ביום הראשון של כל חודש בשעה 02:00)
cron.schedule("0 0 1 * *", () => {
  console.log("מריצים את שמירת החגים למסד הנתונים...");
  saveHolidaysToDatabase();
});

module.exports = router;
