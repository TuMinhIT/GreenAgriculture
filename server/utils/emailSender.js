// utils/sendEmail.js
const transporter = require("../config/email");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Green Agriculture 🌱" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendEmail;