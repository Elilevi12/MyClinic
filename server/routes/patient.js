const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db/connection");
const SECRET_KEY = process.env.SECRET_KEY;
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
      return res.status(401).json({ message: "אסימון חסר" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
          return res.status(403).json({ message: "אסימון לא חוקי" });
      }
      req.user = user; // המשתמש שאומת
 if(req.user.type !== "patient"){
  return res.status(403).json({ message: "גישה אסורה" });
}

      next();
  });
};



router.get("/", (req, res) => {
  res.send("I patient");
});


router.get("/getPatient",authenticateToken,  (req, res) => {
  const idNumber = req.user.id;
  
  
  const sql = `
    SELECT  * FROM patients WHERE user_id = ?`;

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

router.get("/getPatientTreatments",authenticateToken, (req, res) => {
  const idNumber = req.user.id;
  const sql = `SELECT id FROM myclinic.treatment_series where patients_id=? and status='active';`;
  db.query(sql, [idNumber], (err, results) => {
    if (err) {
      console.error("שגיאה בקבלת פרטי המטופל:", err);
      res.status(500).json({ message: "שגיאה בקבלת פרטי המטופל" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "מטופל לא נמצא" });
    } else {
      console.log(results[0].id);
      const sql2 = `SELECT treatment_date,treatment_time FROM myclinic.treatment_sessions where treatment_series_id=? and status='on hold';`
      db.query(sql2, [results[0].id], (err, results) => {
        if (err) {
          console.error("שגיאה בקבלת פרטי המטופל:", err);
          res.status(500).json({ message: "שגיאה בקבלת פרטי המטופל" });
          return;
        }

        res.status(200).json(results);
      }
      );
    }
  });
});


module.exports = router;
