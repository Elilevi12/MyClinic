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

router.get("/getGoalsActiveSession/:patientID", (req, res) => {
  const { patientID } = req.params;
  const sql = `SELECT goals FROM treatment_series where patients_id =? and status="active"`;
  db.query(sql, [patientID], (err, result) => {
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

module.exports = router;
