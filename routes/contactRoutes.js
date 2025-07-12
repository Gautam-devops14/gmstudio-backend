import express from "express";
import Contact from "../models/Contact.js";
import { sendLeadNotification } from "../utils/mailer.js";

const router = express.Router();

// POST /api/contact → Save to DB + Send Email
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body); // Accepts name, email, message, package
    await newContact.save();

    // ✅ Send email notification (includes package if available)
    await sendLeadNotification(req.body);

    res.status(201).json({ message: "Contact saved & email sent" });
  } catch (err) {
    console.error("Error saving contact or sending email:", err);
    res.status(500).json({ error: "Failed to save contact or send email" });
  }
});

// GET /api/contact → Fetch all leads
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
