const express = require("express");

const router = express.Router();
const db = require("../db/connection");

router.get("/", (req, res) => {
  res.send("I therapist");
});

const appTreatmentDiary = require("./treatmentDiary");
router.use("/treatmentDiary", appTreatmentDiary);

router.post("/ListOfPatients", (req, res) => {
  //רשימת מטופלים

  const { therapist_id } = req.body;

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

router.post("/addPatient", (req, res) => {
  //הוספת מטופל
  const {
    therapist_id,
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
                              id_number, phone, email, birth_date, healthcare_provider)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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

router.post("/waitingList", (req, res) => {
  const { therapist_id } = req.body;
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

router.get("/receivingTreatmentDates", (req, res) => {
  //קבלת תארכי טיפול להצגת יומן טיפולים
});
module.exports = router;
