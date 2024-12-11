const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.put('/addPayments', (req, res) => {
    
    const { user_id,  amount } = req.body;
    const sql ="UPDATE patients SET payments = payments + ? WHERE user_id = ?";
    db.query(sql, [amount, user_id], (err, result) => {
        if (err) {
            console.error("שגיאה בהוספת תשלום:", err);
            return res.status(500).json({ message: "שגיאה בהוספת תשלום" });
        }
        console.log("התשלום נוסף בהצלחה");
        
        res.status(200).json({ message: "התשלום נוסף בהצלחה" });
    });
});

router.put("/addDebts", (req, res) => {
    const { user_id,  amount } = req.body;
    
    
    const sql = "UPDATE patients SET debts = debts + ? WHERE user_id = ?";
    db.query(sql, [ amount, user_id], (err, result) => {
        if (err) {
            console.error("שגיאה בהוספת חוב:", err);
            return res.status(500).json({ message: "שגיאה בהוספת חוב" });
        }
        res.status(200).json({ message: "החוב נוסף בהצלחה" });
    });
});


router.get("/paymentStatus/:therapistId", (req, res) => {
  const { therapistId } = req.params;
  const sql=  "SELECT user_id,first_name,last_name,id_number,(debts - payments) AS remaining_debt FROM patients WHERE therapist_id = ?";
    db.query(sql, [therapistId], (err, result) => {
        if (err) {
            console.error("שגיאה בשליפת פרטי תשלומים:", err);
            return res.status(500).json({ message: "שגיאה בשליפת פרטי תשלומים" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "לא נמצאו פרטי תשלומים" });
        }
        res.status(200).json(result);
    })});


module.exports = router;