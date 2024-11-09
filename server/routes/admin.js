const express = require('express');
const router = express.Router();
const db = require("../db/connection");

router.get('/', (req, res) => {
  res.send("I admin");
});

router.get('/getTherapist', (req, res) => {
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

  router.post('/addTherapist', (req, res) => {
     console.log(3);
    const { first_name, last_name, license_number, phone, email, address, specialty } = req.body;
    console.log( specialty );
    
    const randomNumber = Math.floor(Math.random() * 1000000)
    const sqlUser = `INSERT INTO users (username, password, type) VALUES ('?', 123, 'therapist')`;
    db.query(sqlUser,[randomNumber],  (err, result) => {
      if (err) {
        console.error("שגיאה בהוספת המשתמש:", err);
        return res.status(500).json({ message: "שגיאה בהוספת המשתמש" });
      }
 
  
      const userId = result.insertId; 
  
  
  
  
      const sqlTherapist = `
        INSERT INTO therapists (user_id, first_name, last_name, 
        license_number, phone, email, address, specialty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [userId, first_name, last_name, license_number, phone, email, address, specialty];
  
      db.query(sqlTherapist, values, (err) => {
        if (err) {
          console.error("שגיאה בהוספת המטפל:", err);
          return res.status(500).json({ message: "שגיאה בהוספת המטפל" });
        }

  
        res.status(201).json({ message: "המטפל נוסף בהצלחה", therapistId: userId });
      });
    });
  });
  


module.exports = router;
