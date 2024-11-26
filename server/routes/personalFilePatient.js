const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", (req, res) => {
  res.send("I personalFilePatient");
});

router.post("/bringingTreatmentSeries", (req, res) => {
const { patientId, therapistId } = req.body;
const sql = `SELECT * FROM treatment_series WHERE patients_id =? and therapist_id=?`;
db.query(sql, [patientId,therapistId], (err, result) => {
  if (err) {
    console.error("שגיאה בשליפת סדרות הטיפולים:", err);
    return res.status(500).json({ message: "שגיאה בשליפת סדרות הטיפולים" });
  }
  if (result.length === 0) {
    return res.status(404).json({ message: "לא נמצאו סדרות טיפולים" });
  }

  res.status(200).json(result);
});
});

router.post("/ActiveSeriesOfTreatments", (req, res) => {
const { patientId, therapistId } = req.body;
const sql = `SELECT * FROM treatment_series WHERE patients_id =? and therapist_id=? and status='active'`;
db.query(sql, [patientId,therapistId], (err, result) => {
  if (err) {
    console.error("שגיאה בשליפת סדרות הטיפולים:", err);
    return res.status(500).json({ message: "שגיאה בשליפת סדרות הטיפולים" });
  }
  if (result.length === 0) {
    return res.status(404).json({ message: "לא נמצאו סדרות טיפולים" });
  }

  
const sql2=`SELECT * FROM treatment_sessions WHERE treatment_series_id=?`;
db.query(sql2, [result[0].id], (err, result2) => {
    if (err) {
        console.error("שגיאה בשליפת טיפולים:", err);
        return res.status(500).json({ message: "שגיאה בשליפת טיפולים" });
    }

  res.status(200).json(result2);});
});



});

function updateClient(clientData, callback) {
  const { user_id, firstName, lastName, idNumber, phone, email, birthDate, healthCare } = clientData;

  // מיפוי שדות הנתונים בבסיס הנתונים
  const fieldsMap = {
    firstName: 'first_name',
    lastName: 'last_name',
    idNumber: 'id_number',
    phone: 'phone',
    email: 'email',
    birthDate: 'birth_date',
    healthCare: 'healthcare_provider',
  };

  const updates = [];
  const values = [];

  // יצירת רשימת עדכונים
  for (const [key, value] of Object.entries(clientData)) {
    if (key !== 'user_id' && fieldsMap[key] && value !== undefined && value !== null && value !== '') {
      updates.push(`${fieldsMap[key]} = ?`);
      values.push(value);
    }
  }

  // בדיקה אם יש שדות לעדכן
  if (updates.length === 0) {
    return callback(new Error('No fields to update.'));
  }

  // הוספת user_id לערכים
  values.push(user_id);

  const sql = `
    UPDATE patients
    SET ${updates.join(', ')}
    WHERE user_id = ?;
  `;

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error updating client:', error);
      return callback(error);
    }
    callback(null, results);
  });
}


router.post('/updatePatient', (req, res) => {
  const clientData = req.body;

  updateClient(clientData, (err, result) => {
    if (err) {
      console.error('Error updating client:', err.message);
      return res.status(500).json({ message: 'Error updating client', error: err.message });
    }

    res.status(200).json({ message: 'Client updated successfully', result });
  });
});


module.exports = router;