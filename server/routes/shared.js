const express=require('express')
const router=express.Router()
const db = require("../db/connection")
router.get('/',(req,res)=>{
    res.send("I shared")
})
router.post('/login',(req,res)=>{
    const {username,password}=req.body
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("שגיאה בבדיקת פרטי המשתמש:", err);
            return res.status(500).json({ message: "שגיאה בבדיקת פרטי המשתמש" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "שם משתמש או סיסמה שגויים" });
        }
        res.status(200).json(result[0]);
    });
})

const apphebrewHolidays= require('./hebrewHolidays')
router.use('/hebrewHolidays',apphebrewHolidays)
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log("אזור הזמן שלך:", timeZone);
console.log("השעה הנוכחית:", new Date().toLocaleString("he-IL", { timeZone }));



router.get("/getHolidays", (req, res) => {

    db.query('SELECT @@session.time_zone', (err, results) => {
        if (err) {
          console.error("שגיאה בברירת אזור הזמן:", err);
          return;
        }
        console.log("אזור הזמן של החיבור הנוכחי:", results[0]['@@session.time_zone']);
    db.end();
      });


      db.query('SELECT @@global.time_zone', (err, results) => {
        if (err) {
          console.error("שגיאה בברירת אזור הזמן הגלובלי:", err);
          return;
        }
        console.log("אזור הזמן הגלובלי של השרת:", results[0]['@@global.time_zone']);
        db.end();
      });



    const sql = "SELECT * FROM hebrew_holidays";
    db.query(sql, (err, result) => {
      if (err) {
        console.error("שגיאה בשליפת החגים:", err);
        return res.status(500).json({ message: "שגיאה בשליפת החגים" });
      }
      
      const date=new Date(result[0].date)
  console.log( date);
  
      res.status(200).json(result);
    });
  });
 

module.exports = router;
