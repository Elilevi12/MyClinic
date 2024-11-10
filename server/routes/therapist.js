const express = require("express");
const router = express.Router();
const db = require("../db/connection");


router.get("/", (req, res) => {
  res.send("I therapist");
});

router.post("/waitingList", (req, res) => {

  const {therapist_id}=req.body;

  const sql = `SELECT *  FROM patients, WHERE therapist_id = ?`;
db.query(sql,[therapist_id],(err,result)=>{
  if(err){
    console.error("שגיאה בקבלת פרטי המטופלים:", err);
    return res.status(500).json({ message: "שגיאה בקבלת פרטי המטופלים" });
  }
  if (result.length === 0) {
    return res.status(404).json({ message: "לא נמצאו מטופלים" });
  }
  console.log(result);
  
  res.status(200).json(result);
})

});




router.post("/addPatient", (req, res) => {
  const {
    therapist_id,
    first_name,
    last_name,
    id_number,
    phone,
    email,
    birth_date,
    healthcare_provider,
    approved_treatments
  } = req.body;


  const randomNumber = Math.floor(Math.random() * 1000000);

// בקובץ השרת
const sqlUser = `INSERT INTO users (username, password, type) VALUES (?, '123', 'patient')`;

db.query(sqlUser, [randomNumber], (err, result) => {
  if (err) {
    console.error("שגיאה בהוספת המשתמש:", err);
    return res.status(500).json({ message: "שגיאה בהוספת המשתמש" });
  }
  
  const userId = result.insertId;
  
  const sqlPatient = `
    INSERT INTO patients (user_id, therapist_id, first_name, last_name, 
                          id_number, phone, email, birth_date, healthcare_provider, approved_treatments)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
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
      approved_treatments
    ],
    (err, result) => {
      if (err) {
        console.error("שגיאה בהוספת המטופל:", err);
        return res.status(500).json({ message: "שגיאה בהוספת המטופל" });
      }
      res.status(201).json({ message: "המטופל נוסף בהצלחה" });
    }
  );
});

});



module.exports = router;