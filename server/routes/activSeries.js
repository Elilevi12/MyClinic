const express = require("express");
const router = express.Router();
const db = require("../db/connection");



// router.post('/addTreatmentSession', (req, res) => {
// });

router.get("/getDocumentationActiveSession/:serialID", (req, res) => {
  const { serialID } = req.params;
  console.log(serialID);

  const sql =
    "SELECT documentation FROM treatment_sessions where treatment_series_id=? and status='done'";
  db.query(sql, [serialID], (err, result) => {
    if (err) {
      console.error("שגיאה בקבלת פרטי המטופלים:", err);
      return res.status(500).json({ message: "שגיאה בקבלת פרטי המטופלים" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "לא נמצאו טיפולים שבוצעו" });
    }

    res.status(200).json(result);
  });
});

router.get("/getGoalsActiveSession/:serialId", (req, res) => {
  const { serialId } = req.params;
  const sql = `SELECT * FROM  goals where serial_id=? `;
  db.query(sql, [serialId], (err, result) => {
    if (err) {
      console.error("שגיאה בקבלת פרטי המטופלים:", err);
      return res.status(500).json({ message: "שגיאה בקבלת פרטי המטופלים" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "לא נמצאו סדרות פעילות" });
    }

    res.status(200).json(result);
    
  });
});

router.post("/addTreatmentSession", (req, res) => {
  const { therapistId,patientId,comments,total_treatments } = req.body;
  console.log(req.body);
  
const sql = `INSERT INTO treatment_series (patients_id, therapist_id, total_treatments, comments) VALUES (?, ?, ?, ?)`;
  db.query(sql, [patientId, therapistId, total_treatments, comments], (err) => {
    if (err) {
      console.error("שגיאה בהוספת סדרת טיפולים:", err);
      return res.status(500).json({ message: "שגיאה בהוספת המטופל" });
    }
    res.status(201).json({ message: "המטופל נוסף בהצלחה" });
  });

});
module.exports = router;
