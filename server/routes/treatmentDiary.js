const express=require('express')
const router=express.Router()
const db = require("../db/connection")
router.get('/',(req,res)=>{
    res.send("I treatmentDiary")
})

const vacationDates = [
    "2024-01-01",
    "2024-03-15",
    "2024-06-20",
    "2024-09-10",
    "2024-12-25"
];

function generateTreatmentDates(startDate, totalTreatments) {
    const treatmentDates = [];
    const currentDate = new Date(startDate);

    while (treatmentDates.length !== totalTreatments) {
        // שמירה על פורמט התאריך כ-YYYY-MM-DD
        const formattedDate = currentDate.toISOString().split('T')[0];

        // בדיקה אם התאריך הנוכחי לא מופיע בתאריכי החופשות
        if (!vacationDates.includes(formattedDate)) {
            treatmentDates.push(formattedDate);
        }

        // מזיזים את התאריך בשבוע אחד (7 ימים)
        currentDate.setDate(currentDate.getDate() + 7);
    }

    return treatmentDates;
}

// דוגמה להפעלת הפונקציה
console.log(generateTreatmentDates("2024-01-01", 5));


router.post("/addSeries", (req, res) => {
    const {patients_id,treatment_time,total_treatments,status,start_date,series_goals} = req.body;


    
  
    const treatmentDates = generateTreatmentDates(start_date, total_treatments);
console.log(treatmentDates);

const treatment_dates = treatmentDates.join(',');
    const sql = `INSERT INTO treatment_series (patients_id,treatment_time,total_treatments,status,treatment_dates,series_goals) VALUES (?, ?, ?, ?, ?,?)`;
    db.query(sql, [patients_id,treatment_time,total_treatments,status,treatment_dates,series_goals], (err, result) => {
        if (err) {
            console.error("שגיאה בהוספת סדרת טיפולים:", err);
            return res.status(500).json({ message: "שגיאה בהוספת סדרת טיפולים" });
        }
        res.status(200).json({ message: "הסדרה נוספה בהצלחה" });
    });
});


module.exports = router;
