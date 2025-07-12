// blogRoutes.js
import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// ✅ SEED ROUTE: Add dummy blogs
router.post("/seed", async (req, res) => {
  try {
    await Blog.deleteMany(); // Clear existing blogs (optional)

    const dummyBlogs = [
      {
        title: "🎥 How I Grew My Quiz Channel from 0 to 10K Subs",
        excerpt: "From faceless editing to viral quiz formats – here’s my journey.",
        content: `<p>If you’re starting a YouTube quiz channel, consistency and style matter a lot. I started by testing 3 formats: emoji guessing, would you rather, and trivia battles. After 2 weeks, one short went viral and gave me the momentum I needed. Here's what I learned...</p>`,
        coverImage: "https://images.unsplash.com/photo-1678329885908-85eb768aa61b?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "🧠 5 Tips for Better Quiz Engagement",
        excerpt: "Your videos need better hooks, faster pacing, and personal moments.",
        content: `<p>Don’t just edit — tell a mini story. Make viewers feel involved. Add challenge sounds, use voiceovers with energy, and include a call to comment. Also try pacing the questions at just the right tempo — not too fast, not too slow.</p>`,
        coverImage: "https://images.unsplash.com/photo-1678329885908-85eb768aa61b?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        title: "🧰 Tools I Use to Run My Quiz Video Agency",
        excerpt: "From editing to delivery, these are my go-to tools.",
        content: `<p>Here’s my stack: Premiere Pro for editing, CapCut for fast experiments, Notion for client tracking, Canva for thumbnails, and ChatGPT for engagement prompts. For delivery, I use Frame.io or direct Drive links. Here’s how I’ve set up my workflow...</p>`,
        coverImage: "https://images.unsplash.com/photo-1678329885908-85eb768aa61b?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ];

    const created = await Blog.insertMany(dummyBlogs);
    res.status(201).json({ message: "✅ Dummy blogs seeded", data: created });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to seed blogs", error: err });
  }
});

// ➕ Create a blog
router.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to create blog", err });
  }
});

// 📄 Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs", err });
  }
});

// 📄 Get single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog", err });
  }
});

// ✏️ Update blog
router.put("/:id", async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update blog", err });
  }
});

// ❌ Delete blog
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog", err });
  }
});

export default router;
