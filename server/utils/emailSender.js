// utils/sendEmail.js
const transporter = require("../config/email");

const sendEmail = async (options) => {
  const mailOptions = {
    from: `"Green Agriculture 🌱" <${process.env.EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;