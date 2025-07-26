import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import pricingRoutes from './routes/pricingRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import adminStatsRoutes from "./routes/adminStats.js";
import contactRoutes from './routes/contactRoutes.js';
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Health check
app.get('/', (req, res) => {
  res.send('GMStudio API is running');
});

// ✅ API Routes
app.use('/api/pricing', pricingRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin-stats', adminStatsRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/leads", leadRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
