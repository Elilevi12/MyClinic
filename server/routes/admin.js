const express=require('express')
const router=express.Router()
const db = require("../db/connection")

router.get('/',(req,res)=>{
    res.send("I admin")
})

router.get('/getTherapist',(req,res)=>{
   
    const sql ="SELECT * FROM therapists"

    db.query(sql, (err, results) => {
        if (err) {
          console.error("שגיאה בקבלת פרטי המטפלים:", err);
          res.status(500).json({ message: "שגיאה בקבלת פרטי המטפלים" });
          return;
        }
    
        if (results.length === 0) {
          res.status(404).json({ message: "לא נמצאו מטפלים" });
        } else {
          res.status(200).json(results);
        }
      });
})

module.exports = router;
