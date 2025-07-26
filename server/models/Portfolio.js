import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String, // e.g., "Guess the Emoji", "Would You Rather"
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
