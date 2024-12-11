const express = require("express");
const router = express.Router();
const db = require("../db/connection");
router.get("/", (req, res) => {
  res.send("I treatmentDiary");
});

// פונקציה ליצירת תאריכי טיפולים
async function generateTreatmentDates(
  start_date,
  totalTreatments,
  vacationDatesResult
) {
  const treatmentDates = []; //מערך של תאריכי הטיפולים
  const vacationDates = new Set(); // סט של תאריכי החופשה

  vacationDatesResult.forEach(({ start_date, end_date }) => {
    // הפיכת תאריכי החופשות לפורמט תאריך והוספתם ל-Set
    const startVacation = new Date(start_date);
    const endVacation = new Date(end_date);



    for (
      let date = new Date(startVacation);
      date <= endVacation;
      date.setDate(date.getDate() + 1)
    ) {
      vacationDates.add(date.toISOString().split("T")[0]);
    }
  });


const sql="select date from hebrew_holidays"

const [rows]=await db.promise().query(sql)
rows.forEach(({date})=>{
  vacationDates.add(new Date(date).toISOString().split("T")[0]);
})

  let currentDate = new Date(start_date);

  // יצירת תאריכי הטיפולים
  while (treatmentDates.length < totalTreatments) {
    const formattedDate = currentDate.toISOString().split("T")[0];

    if (!vacationDates.has(formattedDate)) {
      treatmentDates.push(formattedDate);
    }

    currentDate.setDate(currentDate.getDate() + 7); // מעבר לשבוע הבא
  }

  return treatmentDates;
}

router.post("/creatingAseriesOfTreatments", async (req, res) => {
  
  const {
    treatment_series_id,
    therapist_id,
    start_date,
    treatmentTime,
    goals,
    price,
  } = req.body;
console.log(goals);

  try {
    // שליפת מספר הטיפולים בסדרה
    const [[{ total_treatments }]] = await db
      .promise()
      .query("SELECT total_treatments FROM treatment_series WHERE id = ?", [
        treatment_series_id,
      ]);

    // שליפת תאריכי החופשה של המטפל
    const [vacationDatesResult] = await db
      .promise()
      .query(
        "SELECT start_date, end_date FROM vacation_days WHERE therapist_id = ?",
        [therapist_id]
      );

    // יצירת תאריכי הטיפולים
    const treatmentDates = await generateTreatmentDates(
      start_date,
      total_treatments,
      vacationDatesResult
    );

    // התחלת טרנזקציה
    await db.promise().beginTransaction();

    // הוספת תאריכים לטבלה
    const insertPromises = treatmentDates.map((treatmentDate) => {
      return db
        .promise()
        .query(
          `INSERT INTO treatment_sessions (treatment_series_id, treatment_date, treatment_time) VALUES (?, ?, ?)`,
          [treatment_series_id, treatmentDate, treatmentTime]
        );
    });

    await Promise.all(insertPromises);

    // עדכון סטטוס הסדרה
    await db
      .promise()
      .query(
        "UPDATE treatment_series SET status = 'active',price=? WHERE id = ?",
        [ price, treatment_series_id]
      );
    
      
const insertGoals=goals.map((goal)=>{ 
  return db
  .promise()
  .query(
    "INSERT INTO  goals (serial_id, goal) VALUES (?, ?)",
  [treatment_series_id, goal]);
})
await Promise.all(insertGoals);
   
    // סיום הטרנזקציה
    await db.promise().commit();

    res.status(200).json({ message: "הסדרה נוספה בהצלחה" });
  } catch (error) {
    // ביטול טרנזקציה במקרה של שגיאה
    await db.promise().rollback();
    console.error("שגיאה:", error);
    res.status(500).json({ message: "שגיאה בתהליך יצירת הסדרה", error });
  }
});

router.post("/addingVacationays", (req, res) => {
  const { therapist_id, start_date, end_date } = req.body;

  const today = new Date();
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (startDate < today) {
    return res
      .status(400)
      .json({ message: "תאריך ההתחלה אינו יכול להיות מוקדם מהיום הנוכחי" });
  }

  if (endDate < startDate) {
    return res
      .status(400)
      .json({ message: "תאריך הסיום אינו יכול להיות מוקדם מתאריך ההתחלה" });
  }

  const sql = `INSERT INTO vacation_days (therapist_id, start_date, end_date) VALUES (?, ?, ?)`;
  db.query(sql, [therapist_id, start_date, end_date], (err, result) => {
    if (err) {
      console.error("שגיאה בהוספת יום חופש:", err);
      return res.status(500).json({ message: "שגיאה בהוספת יום חופש" });
    }
    res.status(200).json({ message: "היום נוסף בהצלחה" });
  });
});

router.get("/vacationays/:therapistId", (req, res) => {
  //שליפת ימי חופש

  const sql = `SELECT * FROM vacation_days WHERE therapist_id = ?`;
  db.query(sql, [req.params.therapistId], (err, result) => {
    if (err) {
      console.error("שגיאה בשליפת ימי החופש:", err);
      return res.status(500).json({ message: "שגיאה בשליפת ימי החופש" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "לא נמצאו ימי חופש" });
    }
    res.status(200).json(result);
  });
});

router.put("/changeTreatmentDate", async (req, res) => {
  console.log(req.body);
  
  const { treatmentId, date, time } = req.body;

  try {
    // בדיקת סטטוס הטיפול
    const sql1 = "SELECT status FROM treatment_sessions WHERE id=?";
    const [rows] = await db.promise().query(sql1, [treatmentId]);

    if (rows[0].status === "done") {
      return res.status(400).json({ message: "הטיפול כבר הושלם" });
    }

    // עדכון תאריך ושעה של הטיפול
    const sql2 = `UPDATE treatment_sessions SET treatment_date = ?, treatment_time = ? WHERE id = ?`;
    await db.promise().query(sql2, [date, time, treatmentId]);

    res.status(200).json({ message: "התאריך עודכן בהצלחה" });
  } catch (err) {
    console.error("שגיאה בעדכון תאריך הטיפול:", err);
    res.status(500).json({ message: "שגיאה בעדכון תאריך הטיפול" });
  }
});

router.post("/cancelTreatment", async (req, res) => {
  const { treatmentId, serialID, cancelnText, therapistId } = req.body;

  try {
    // התחלת טרנזקציה
    await db.promise().beginTransaction();

    // שלב 1: עדכון הסטטוס והסיבה לביטול הטיפול
    const sql1 =
      "UPDATE treatment_sessions SET status='cancellation', reason_for_cancellation=? WHERE id=?";
    await db.promise().query(sql1, [cancelnText, treatmentId]);

    // שלב 2: שליפת תאריכי חופשה
    const sql2 =
      "SELECT start_date, end_date FROM vacation_days WHERE therapist_id = ?";
    const [vacationDatesResult] = await db.promise().query(sql2, [therapistId]);

    // שלב 3: שליפת תאריך ושעת הטיפול האחרון
    const sql3 =
      "SELECT MAX(CONCAT(treatment_date, ' ', treatment_time)) AS last_treatment_date FROM treatment_sessions WHERE treatment_series_id=?";
    const [result] = await db.promise().query(sql3, [serialID]);

    if (!result[0].last_treatment_date) {
      throw new Error("לא נמצא טיפול אחרון בסדרה");
    }

    let treatments = result[0].last_treatment_date.split(" ");
    const lastTreatment = new Date(treatments[0]);
    lastTreatment.setDate(lastTreatment.getDate() + 7);

    // יצירת תאריך הטיפול החדש
    const newTreatmentDate = await generateTreatmentDates(
      lastTreatment,
      1,
      vacationDatesResult
    );

    if (!newTreatmentDate) {
      throw new Error("תאריך טיפול חדש לא נוצר כראוי");
    }

    // שלב 4: הוספת טיפול חדש
    const sql4 =
      "INSERT INTO treatment_sessions (treatment_series_id, treatment_date, treatment_time) VALUES (?, ?, ?)";
    await db.promise().query(sql4, [serialID, newTreatmentDate, treatments[1]]);

    // סיום טרנזקציה
    await db.promise().commit();
    res.status(200).json({ message: "הטיפול בוטל בהצלחה" });
  } catch (err) {
    console.error("שגיאה במהלך ביטול טיפול:", err);
    await db.promise().rollback();
    res.status(500).json({ message: "שגיאה במהלך ביטול טיפול" });
  }
});



router.put("/documentation", async (req, res) => {
  const { treatmentId, documentation, serialID, userId } = req.body;


  const sql = "select status from treatment_sessions where id=?";
  const [status] = await db.promise().query(sql, [treatmentId]);
  if (status[0].status === "done") {
    return res.status(400).json({ message: "הטיפול כבר הושלם" });
  }

  try {
    // Update treatment_sessions
    await db
      .promise()
      .query(
        "UPDATE treatment_sessions SET documentation=?, status=? WHERE id=?",
        [documentation, "done", treatmentId]
      );

    // Update treatment_series
    await db
      .promise()
      .query(
        "UPDATE treatment_series SET completed_treatments = completed_treatments + 1 WHERE id=?",
        [serialID]
      );

    // Check if all treatments are completed
    const [rows] = await db
      .promise()
      .query(
        "SELECT completed_treatments, total_treatments FROM treatment_series WHERE id=?",
        [serialID]
      );

    if (rows[0].completed_treatments === rows[0].total_treatments) {
      // Update treatment_series status
      await db
        .promise()
        .query(' UPDATE treatment_series SET status="finished" WHERE id=?', [
          serialID,
        ]);
    }

    // Update patient debts
    await db
      .promise()
      .query(
        "UPDATE patients SET debts = debts + (SELECT price FROM treatment_series WHERE id=?) WHERE user_id=?",
        [serialID, userId]
      );

    // Send success response
    res.status(200).json({ message: "התיעוד נשמר בהצלחה" });
  } catch (err) {
    console.error("שגיאה בשמירת התיעוד:", err);
    res.status(500).json({ message: "שגיאה בשמירת התיעוד" });
  }
});

module.exports = router;
