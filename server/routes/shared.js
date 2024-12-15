const express=require('express')
const router=express.Router()
const db = require("../db/connection")
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key_here";
router.get('/',(req,res)=>{
    res.send("I shared")
})
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT id, type FROM users WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("שגיאה בבדיקת פרטי המשתמש:", err);
            return res.status(500).json({ message: "שגיאה בבדיקת פרטי המשתמש" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "שם משתמש או סיסמה שגויים" });
        }

        const user = result[0];
        const token = jwt.sign(
            { id: user.id, type: user.type },
            SECRET_KEY,
            { expiresIn: "1h" } // האסימון יפוג לאחר שעה
        );

        res.status(200).json({ token });
    });
});

const apphebrewHolidays= require('./hebrewHolidays')
router.use('/hebrewHolidays',apphebrewHolidays)


 

module.exports = router;
