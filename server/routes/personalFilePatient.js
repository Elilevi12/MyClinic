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
const sql = `SELECT * FROM treatment_series WHERE patients_id =? and therapist_id=? and status='done'`;
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



module.exports = router;