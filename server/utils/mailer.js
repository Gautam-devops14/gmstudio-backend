import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 1. Configure Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

// 2. Send Email Notification to Admin
export const sendLeadNotification = async ({ name, email, message, package: selectedPackage }) => {
  try {
    const mailOptions = {
      from: `"GMStudio Lead" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `📩 New Lead from ${name}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
        ${selectedPackage ? `<p><strong>Selected Package:</strong> ${selectedPackage}</p>` : ""}
        <hr />
        <p style="font-size:12px; color:gray;"><em>This lead was submitted via the GMStudio contact form.</em></p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to admin:", info.messageId);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};
