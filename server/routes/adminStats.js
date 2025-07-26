import express from "express";
import Blog from "../models/Blog.js";
import Pricing from "../models/Pricing.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blogCount = await Blog.countDocuments();
    const latestBlog = await Blog.findOne().sort({ updatedAt: -1 });

    const pricingCount = await Pricing.countDocuments();
    const latestPricing = await Pricing.findOne().sort({ updatedAt: -1 });

    res.json({
      blogCount,
      pricingCount,
      latestBlogUpdate: latestBlog?.updatedAt,
      latestPricingUpdate: latestPricing?.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin stats", error: err });
  }
});

export default router;
