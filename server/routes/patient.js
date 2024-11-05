const express=require('express')
const mysql=require('mysql2')
const router=express.Router()
router.get('/',(req,res)=>{
    res.send("I patient")
})
const db = require("../db/connection")



// יצירת חיבור לבסיס הנתונים

db.connect((err) => {
  if (err) {
    console.error("שגיאה בחיבור לבסיס הנתונים:", err);
    return;
  }
  console.log("החיבור לבסיס הנתונים בוצע בהצלחה");
});

// נקודת קצה להוספת מטופל חדש
router.post("/addPatient", (req, res) => {
 
  
  const {
    first_name,
    last_name,
    id_number,
    phone,
    email,
    birth_date,
    appointment_date,
    health_care_provider,
    approved_sessions,
    session_price
  } = req.body;

  const sql = `
    INSERT INTO patients (first_name, last_name, id_number, phone, email, birth_date, appointment_date, health_care_provider, approved_sessions, session_price,treatment_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  db.query(
    sql,
    [
      first_name,
      last_name,
      id_number,
      phone,
      email,
      birth_date,
      appointment_date,
      health_care_provider,
      approved_sessions,
      session_price,
      treatment_time
    ],
    (err, result) => {
      if (err) {
        console.error("שגיאה בהוספת מטופל:", err);
        res.status(500).json({ message: "שגיאה בהוספת מטופל" });
        return;
      }
      res.status(201).json({ message: "המטופל נוסף בהצלחה", patientId: result.insertId });
    }
  );
});

router.get("/getPatient/:id_number", (req, res) => {
  const idNumber = req.params.id_number;
console.log("1234");

  const sql = `
    SELECT first_name, last_name, id_number, phone, email, birth_date, appointment_date, health_care_provider, approved_sessions, session_price,treatment_time
    FROM patients
    WHERE id_number = ?
  `;

  db.query(sql, [idNumber], (err, results) => {
    if (err) {
      console.error("שגיאה בקבלת פרטי המטופל:", err);
      res.status(500).json({ message: "שגיאה בקבלת פרטי המטופל" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "מטופל לא נמצא" });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

module.exports = router;