const mysql=require('mysql2')
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
      timezone: 'utc'
});

  db.connect((err) => {
    if (err) {
      console.error("שגיאה בחיבור לבסיס הנתונים:", err);
      return;
    }
    console.log("החיבור לבסיס הנתונים בוצע בהצלחה");
  });

  module.exports = db;