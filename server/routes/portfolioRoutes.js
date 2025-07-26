import express from "express";
import Portfolio from "../models/Portfolio.js";

const router = express.Router();

// GET all portfolio items
router.get("/", async (req, res) => {
  try {
    const items = await Portfolio.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new portfolio item
router.post("/", async (req, res) => {
  const { title, thumbnailUrl, videoUrl, category } = req.body;

  const newItem = new Portfolio({
    title,
    thumbnailUrl,
    videoUrl,
    category,
  });

  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
