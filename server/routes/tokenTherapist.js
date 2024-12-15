require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key_here";
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
 console.log(req.user);
 
 if (req.user.type !== "therapist") {
  return res.status(403).json({ message: "גישה אסורה" });
}
      next();
  });
};
module.exports = authenticateToken;