const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./tokenTherapist");
const router = express.Router();
const db = require("../db/connection");

router.get("/", (req, res) => {
  res.send("I therapist");
});

const appTreatmentDiary = require("./treatmentDiary");
router.use("/treatmentDiary", appTreatmentDiary);

const appTreatmentSession = require("./activSeries");
router.use("/activSeries", appTreatmentSession);

const appPersonalFilePatient = require("./personalFilePatient");
router.use("/personalFilePatient", appPersonalFilePatient);

const appMoneyManagement = require("./moneyManagement");
router.use("/moneyManagement", appMoneyManagement);



router.post("/ListOfPatients",authenticateToken, (req, res) => {
  //רשימת מטופלים

  const  therapist_id  = req.user.id;

  const sql = `SELECT *  FROM patients WHERE therapist_id = ?`;
  db.query(sql, [therapist_id], (err, result) => {
    if (err) {
      console.error("שגיאה בקבלת פרטי המטופלים:", err);
      return res.status(500).json({ message: "שגיאה בקבלת פרטי המטופלים" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "לא נמצאו מטופלים" });
    }

    res.status(200).json(result);
  });
});

router.post("/addPatient",authenticateToken ,(req, res) => {
  //הוספת מטופל
  const {
    first_name,
    last_name,
    id_number,
    phone,
    email,
    birth_date,
    healthcare_provider,
    total_treatments,
    comments,
  } = req.body;
const therapist_id = req.user.id;
  const randomNumber = Math.floor(Math.random() * 1000000);
  db.beginTransaction((err) => {
    if (err) {
      console.error("שגיאה בתחילת טרנזקציה:", err);
      return res.status(500).json({ message: "שגיאה בהוספת המטופל" });
    }

    const sqlUser = `INSERT INTO users (username, password, type) VALUES (?, '123', 'patient')`;

    db.query(sqlUser, [randomNumber], (err, result) => {
      if (err) {
        console.error("שגיאה בהוספת המשתמש:", err);
        return db.rollback(() =>
          res.status(500).json({ message: "שגיאה בהוספת המשתמש" })
        );
      }

      const userId = result.insertId;

      const sqlPatient = `
        INSERT INTO patients (user_id, therapist_id, first_name, last_name, 
                              id_number, phone, email, birth_date, healthcare_provider,payments,debts)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,0,0)`;

      db.query(
        sqlPatient,
        [
          userId,
          therapist_id,
          first_name,
          last_name,
          id_number,
          phone,
          email,
          birth_date,
          healthcare_provider,
        ],
        (err) => {
          if (err) {
            console.error("שגיאה בהוספת המטופל:", err);
            return db.rollback(() =>
              res.status(500).json({ message: "שגיאה בהוספת המטופל" })
            );
          }

          const sqlTreatmentSeries =
            "INSERT INTO treatment_series (patients_id, therapist_id, total_treatments, comments) VALUES (?, ?, ?, ?)";
          db.query(
            sqlTreatmentSeries,
            [userId, therapist_id, total_treatments, comments],
            (err) => {
              if (err) {
                console.error("שגיאה בהוספת סדרת טיפולים:", err);
                return db.rollback(() =>
                  res.status(500).json({ message: "שגיאה בהוספת המטופל" })
                );
              }

              db.commit((err) => {
                if (err) {
                  console.error("שגיאה בביצוע הטרנזקציה:", err);
                  return db.rollback(() =>
                    res.status(500).json({ message: "שגיאה בהוספת המטופל" })
                  );
                }
                res.status(201).json({ message: "המטופל נוסף בהצלחה" });
              });
            }
          );
        }
      );
    });
  });
});

router.post("/waitingList",authenticateToken, (req, res) => {

  const  therapist_id  = req.user.id;
  console.log(therapist_id);
  
  const sql = ` SELECT 
      ts.*, 
      p.* 
  FROM 
      treatment_series ts
  JOIN 
      patients p ON ts.patients_id = p.user_id
  WHERE 
      ts.status = 'on hold' 
      AND ts.therapist_id = ?;`;
  db.query(sql, [therapist_id], (err, result) => {
    if (err) {
      console.error("שגיאה בקבלת פרטי המטופלים:", err);
      return res.status(500).json({ message: "שגיאה בקבלת פרטי המטופלים" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "לא נמצאו מטופלים ברשימת המתנה" });
    }

    res.status(200).json(result);
  });
});

router.get("/receivingTreatmentDates",authenticateToken, (req, res) => {


  const sql = `
SELECT p.first_name AS patient_first_name,
       p.last_name AS patient_last_name,
       DATE_FORMAT(ts.treatment_date, '%Y-%m-%d') AS treatment_date,
       ts.treatment_time,
       ts.id AS treatment_id
FROM treatment_sessions ts
JOIN treatment_series tser ON ts.treatment_series_id = tser.id
JOIN patients p ON tser.patients_id = p.user_id
WHERE tser.therapist_id = ?
ORDER BY ts.treatment_date, ts.treatment_time;
`;
console.log(req.user);


  const query = db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      console.error("שגיאה בקבלת תאריכי טיפול:", err);
      return res.status(500).json({ message: "שגיאה בקבלת תאריכי טיפול" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "לא נמצאו תאריכי טיפול" });
    }

    return res.status(200).json(result);
  });


  //קבלת תארכי טיפול להצגת יומן טיפולים
});

router.get("/getTherapist/",authenticateToken, (req, res) => {
  const sql = "SELECT * FROM therapists where user_id = ?";
  db.query(sql, [req.user.id], 
    (err, results) => {
      if (err) {
        console.error("שגיאה בקבלת פרטי המטפלים:", err);
        return res.status(500).json({ message: "שגיאה בקבלת פרטי המטפלים" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "לא נמצאו מטפלים" });
      }

      res.status(200).json(results[0]);
    });
});

router.get("/getPatient/:id",authenticateToken, (req, res) => {
  const sql = "SELECT * FROM patients WHERE user_id = ?";

  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error("שגיאה בקבלת פרטי המטופל:", err);
      return res.status(500).json({ message: "שגיאה בקבלת פרטי המטופל" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "לא נמצא מטופל" });
    }

    res.status(200).json(results[0]);
  });
});


module.exports = router;
