const express=require('express')
const router=express.Router()
const db = require("../db/connection")
router.get('/',(req,res)=>{
    res.send("I treatmentDiary")
})

// פונקציה ליצירת תאריכי טיפולים
function generateTreatmentDates(start_date, totalTreatments, vacationDatesResult) {
    const treatmentDates = [];//מערך של תאריכי הטיפולים
    const vacationDates = new Set(); // סט של תאריכי החופשה
 
    vacationDatesResult.forEach(({ start_date, end_date }) => {// הפיכת תאריכי החופשות לפורמט תאריך והוספתם ל-Set
        const startVacation = new Date(start_date);
        const endVacation = new Date(end_date);

        for (let date = new Date(startVacation); date <= endVacation; date.setDate(date.getDate() + 1)) {
            vacationDates.add(date.toISOString().split('T')[0]);
        }
    });

    let currentDate = new Date(start_date);

    // יצירת תאריכי הטיפולים
    while (treatmentDates.length < totalTreatments) {
        const formattedDate = currentDate.toISOString().split('T')[0];

        if (!vacationDates.has(formattedDate)) {
            treatmentDates.push(formattedDate);
        }

        currentDate.setDate(currentDate.getDate() + 7); // מעבר לשבוע הבא
    }

    return treatmentDates;
}

router.post("/creatingAseriesOfTreatments", async (req, res) => {
    const { treatment_series_id, therapist_id, start_date, treatmentTime,goals } = req.body;


    try {
        // שליפת מספר הטיפולים בסדרה
        const [[{ total_treatments }]] = await db.promise().query(
            "SELECT total_treatments FROM treatment_series WHERE id = ?",
            [treatment_series_id]
        );

        // שליפת תאריכי החופשה של המטפל
        const [vacationDatesResult] = await db.promise().query(
            "SELECT start_date, end_date FROM vacation_days WHERE therapist_id = ?",
            [therapist_id]
        );

        // יצירת תאריכי הטיפולים
        const treatmentDates = generateTreatmentDates(start_date, total_treatments, vacationDatesResult);

        // התחלת טרנזקציה
        await db.promise().beginTransaction();

        // הוספת תאריכים לטבלה
        const insertPromises = treatmentDates.map((treatmentDate) => {
            return db.promise().query(
                `INSERT INTO treatment_sessions (treatment_series_id, treatment_date, treatment_time) VALUES (?, ?, ?)`,
                [treatment_series_id, treatmentDate, treatmentTime]
            );
        });

        await Promise.all(insertPromises);

        // עדכון סטטוס הסדרה
        await db.promise().query(
            "UPDATE treatment_series SET status = 'done',goals=? WHERE id = ?",
            [goals,treatment_series_id]
        );
      

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
      return res.status(400).json({ message: "תאריך ההתחלה אינו יכול להיות מוקדם מהיום הנוכחי" });
    }
  
    if (endDate < startDate) {
      return res.status(400).json({ message: "תאריך הסיום אינו יכול להיות מוקדם מתאריך ההתחלה" });
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
  

router.get('/vacationays/:therapistId',(req,res)=>{//שליפת ימי חופש
    
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


module.exports = router;
