import express from "express";
import Contact from "../models/contactModel.js";
import { sendLeadEmail } from "../utils/mailer.js";

const router = express.Router();

// 📩 Create New Lead + Send Email
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newLead = await Contact.create({ name, email, message });

    // ✅ Send Email Notification
    await sendLeadEmail(newLead);

    res.status(201).json({ message: "Message sent & email notified!" });
  } catch (err) {
    console.error("Email sending failed:", err);
    res.status(500).json({ error: "Failed to send lead" });
  }
});

// 📄 Get All Leads
router.get("/", async (req, res) => {
  try {
    const leads = await Contact.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

// 🗑️ Delete Lead
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete lead" });
  }
});

export default router;
