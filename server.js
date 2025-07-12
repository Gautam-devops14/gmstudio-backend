import express from 'express';
import dotenv from 'dotenv';
import connectDB from './server/config/db.js';

import pricingRoutes from './server/routes/pricingRoutes.js';
import portfolioRoutes from './server/routes/portfolioRoutes.js';
import blogRoutes from './server/routes/blogRoutes.js';
import serviceRoutes from './server/routes/serviceRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/pricing', pricingRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
