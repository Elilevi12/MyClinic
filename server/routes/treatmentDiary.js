const express=require('express')
const router=express.Router()
const db = require("../db/connection")
router.get('/',(req,res)=>{
    res.send("I treatmentDiary")
})
router.post("/addSeries", (req, res) => {
    const {patients_id,treatment_time,total_treatments,status,start_date,series_goals} = req.body;
console.log(start_date);
console.log(typeof total_treatments);


    function generateTreatmentDates(startDate, totalTreatments) {
        const treatmentDates = [];
        const currentDate = new Date(startDate);
    
        for (let i = 0; i < totalTreatments; i++) {
            // מוסיפים את התאריך הנוכחי למערך
            treatmentDates.push(currentDate.toISOString().split('T')[0]); // שמירה בפורמט YYYY-MM-DD
            
            // מזיזים את התאריך בשבוע אחד (7 ימים)
            currentDate.setDate(currentDate.getDate() + 7);
        }
    
        return treatmentDates;
    }
  
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
