const nodemailer = require("nodemailer");
const pass_mail = process.env.PASS_MAIL;
const transporter = nodemailer.createTransport({
  service: "Gmail", // או ספק דוא"ל אחר
  auth: {
    user: "myclinic839@gmail.com", // המייל ממנו תשלח
    pass:pass_mail , // הסיסמה שלך או App Password
  },
});

const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: "myclinic839@gmail.com",
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
