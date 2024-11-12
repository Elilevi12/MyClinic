const express=require('express')
const router=express.Router()
const db = require("../db/connection")
router.get('/',(req,res)=>{
    res.send("I treatmentDiary")
})


function generateTreatmentDates(therapist_id, startDate, totalTreatments) {// פונקציה ליצירת תאריכי טיפולים
    const treatmentDates = []; // מערך לאחסון תאריכי הטיפולים
    const vacationDates = []; // מערך לאחסון תאריכי החופשות

    const query = 'SELECT start_date, end_date FROM vacation_days WHERE therapist_id = ?'; 

    db.query(query, [therapist_id], (err, result) => {
        if (err) {
            console.error("שגיאה בקבלת תאריכי החופשות:", err);
            return res.status(500).json({ message: "שגיאה בקבלת תאריכי החופשות" });
        }

        // הפיכת תאריכי החופשות לפורמט תאריך והוספתם למערך
        result.forEach((row) => {
            const startVacation = new Date(row.start_date);
            const endVacation = new Date(row.end_date);


            // הוספה של כל התאריכים בין תאריך ההתחלה לתאריך הסיום של החופשה
            for (let date = new Date(startVacation); date <= endVacation; date.setDate(date.getDate() + 1)) {
                vacationDates.push(date.toISOString().split('T')[0]);
            }
        });
console.log("חופשות",vacationDates);
        const currentDate = new Date(startDate);

        // לולאה להוספת תאריכי הטיפולים תוך דילוג על חופשות
        while (treatmentDates.length < totalTreatments) {
            const formattedDate = currentDate.toISOString().split('T')[0];

            // הוספה אם התאריך לא מופיע בתאריכי החופשות
            if (!vacationDates.includes(formattedDate)) {
                treatmentDates.push(formattedDate);
            }

            // מעבר לשבוע הבא
            currentDate.setDate(currentDate.getDate() + 7);
        }
        
        console.log("תאריכי הטיפולים:", treatmentDates);
        return treatmentDates;
    });
}



router.post("/creatingAseriesOfTreatments", (req, res) => {//יצירת סדרת טיפולים
    const {patients_id,treatment_time,total_treatments,status,start_date,series_goals} = req.body;

    const treatmentDates = generateTreatmentDates(patients_id,start_date, total_treatments);
console.log(treatmentDates);

const treatment_dates = treatmentDates.join(',');
    const sql = `INSERT INTO treatment_series (patients_id,treatment_time,total_treatments,status,treatment_dates,series_goals) VALUES (?, ?, ?, ?, ?,?)`;
    db.query(sql, [patients_id,treatment_time,total_treatments,status,treatment_dates,series_goals], (err, result) => {
        if (err) {
            console.error("שגיאה בהוספת סדרת טיפולים:", err);
            return res.status(500).json({
                
                 message: "שגיאה בהוספת סדרת טיפולים" });
        }
        res.status(200).json({ message: "הסדרה נוספה בהצלחה" });
    });
});

router.post("/addingVacationays", (req, res) => {//הוספת ימי חופש
    const {therapist_id,start_date,end_date} = req.body;
    console.log(start_date,end_date,therapist_id);
    
    const sql = `INSERT INTO vacation_days (therapist_id ,start_date ,end_date) VALUES (?,?,?)`;
    db.query(sql, [therapist_id,start_date,end_date], (err, result) => {
        if (err) {
            console.error("שגיאה בהוספת יום חופש:", err);
            return res.status(500).json({ message: "שגיאה בהוספת יום חופש" });
        }
        res.status(200).json({ message: "היום נוסף בהצלחה" });
    });

});



module.exports = router;
