module.exports=(app,mysql)=>{
    app.get('/patient',(req,res)=>{
        res.send("I patient")
    })

    



// יצירת חיבור לבסיס הנתונים
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // שם משתמש
  password: "123456", // סיסמה
  database: "MyClinic",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error("שגיאה בחיבור לבסיס הנתונים:", err);
    return;
  }
  console.log("החיבור לבסיס הנתונים בוצע בהצלחה");
});

// נקודת קצה להוספת מטופל חדש
app.post("/add-patient", (req, res) => {
  const {
    firstName,
    lastName,
    idNumber,
    phone,
    email,
    birthDate,
    appointmentDate,
    healthCareProvider,
    approvedSessions,
    sessionPrice
  } = req.body;

  const sql = `
    INSERT INTO patients (first_name, last_name, id_number, phone, email, birth_date, appointment_date, health_care_provider, approved_sessions, session_price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      firstName,
      lastName,
      idNumber,
      phone,
      email,
      birthDate,
      appointmentDate,
      healthCareProvider,
      approvedSessions,
      sessionPrice
    ],
    (err, result) => {
      if (err) {
        console.error("שגיאה בהוספת מטופל:", err);
        res.status(500).json({ message: "שגיאה בהוספת מטופל" });
        return;
      }
      res.status(201).json({ message: "המטופל נוסף בהצלחה", patientId: result.insertId });
    }
  );
});


}