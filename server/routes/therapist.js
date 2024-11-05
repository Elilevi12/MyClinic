const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("I therapist");
});

const db = require("../db/connection");
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
    session_price,
    treatment_time
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
      treatment_time,
    ],
    (err, result) => {
      if (err) {
        console.error("שגיאה בהוספת מטופל:", err);
        res.status(500).json({ message: "שגיאה בהוספת מטופל" });
        return;
      }
      res
        .status(201)
        .json({ message: "המטופל נוסף בהצלחה", patientId: result.insertId });
    }
  );
});

router.get("/getPatientsByTherapist/:therapist_id", (req, res) => {
    const therapistId = req.params.therapist_id;
  
    const sql = `
      SELECT first_name, last_name, id_number, phone, email, birth_date, appointment_date, health_care_provider, approved_sessions, session_price, treatment_time
      FROM patients
      WHERE therapist_id = ?
    `;
  
    db.query(sql, [therapistId], (err, results) => {
      if (err) {
        console.error("שגיאה בקבלת פרטי המטופלים:", err);
        res.status(500).json({ message: "שגיאה בקבלת פרטי המטופלים" });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ message: "לא נמצאו מטופלים" });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  

module.exports = router;
