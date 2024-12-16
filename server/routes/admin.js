const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const jwt = require("jsonwebtoken");
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

 if (req.user.type !== "admin") {
  return res.status(403).json({ message: "גישה אסורה" });
}
      next();
  });
};



router.get("/", (req, res) => {
  res.send("I admin");
});

router.get("/getTherapists", authenticateToken, (req, res) => {
  
 
  const sql = "SELECT * FROM therapists";
  db.query(sql, (err, results) => {
      if (err) {
          console.error("שגיאה בקבלת פרטי המטפלים:", err);
          return res.status(500).json({ message: "שגיאה בקבלת פרטי המטפלים" });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: "לא נמצאו מטפלים" });
      }


      res.status(200).json(results);
  });
});

router.post("/addTherapist",authenticateToken, (req, res) => {
  const {
    first_name,
    last_name,
    license_number,
    phone,
    email,
    address,
    specialty,
  } = req.body;
  
  const randomNumber = Math.floor(Math.random() * 1000000);

  db.beginTransaction((err) => {
    if (err) {
      console.error("שגיאה בתחילת טרנזקציה:", err);
      return res.status(500).json({ message: "שגיאה בהוספת המטפל" });
    }

    // הוספת המשתמש לטבלת users
    const sqlUser = `INSERT INTO users (username, password, type) VALUES (?, 123, 'therapist')`;
    db.query(sqlUser, [randomNumber], (err, result) => {
      if (err) {
        console.error("שגיאה בהוספת המשתמש:", err);
        return db.rollback(() => res.status(500).json({ message: "שגיאה בהוספת המטפל" }));
      }

      const userId = result.insertId;

      // הוספת המטפל לטבלת therapists
      const sqlTherapist = `
        INSERT INTO therapists (user_id, first_name, last_name, 
        license_number, phone, email, address, specialty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        userId,
        first_name,
        last_name,
        license_number,
        phone,
        email,
        address,
        specialty,
      ];

      db.query(sqlTherapist, values, (err) => {
        if (err) {
          console.error("שגיאה בהוספת המטפל:", err);
          return db.rollback(() => res.status(500).json({ message: "שגיאה בהוספת המטפל" }));
        }

        db.commit((err) => {
          if (err) {
            console.error("שגיאה בביצוע השאילתות:", err);
            return db.rollback(() => res.status(500).json({ message: "שגיאה בהוספת המטפל" }));
          }
          return res.status(201).json({ message: "המטפל נוסף בהצלחה" });
        });
      });
    });
  });
});


module.exports = router;
