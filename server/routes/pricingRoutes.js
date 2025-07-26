import express from 'express';
const router = express.Router();
import Pricing from '../models/Pricing.js';

/**
 * @route   POST /api/pricing/seed
 * @desc    Seed dummy pricing data
 */
router.post('/seed', async (req, res) => {
  try {
    const dummyPricing = [
      {
        title: 'Would You Rather Quiz',
        price: 40,
        features: ['🎯 50-question “Would You Rather”', '🎙 Voiceover + Edits + Thumbnail', '🚚 2–3 Day Delivery'],
        ctaText: 'book',
      },
      {
        title: 'Guess The Food',
        price: 45,
        features: ['🧠 “Guess the Word” + Bonus Qs', '🔧 All Edits + SEO Boost + Thumbnail', '⚡ Priority Support'],
        ctaText: 'book',
      },
      {
        title: 'Guess the Voice',
        price: 65,
        features: ['🎤 “Guess the Voice” – Advanced Quiz', '📈 Research + Custom FX + Manager', '🧩 Channel Strategy Included'],
        ctaText: 'call',
      },
    ];

    await Pricing.deleteMany();
    const created = await Pricing.insertMany(dummyPricing);
    res.status(201).json({ message: '✅ Seed data inserted!', data: created });
  } catch (error) {
    res.status(500).json({ message: '❌ Error seeding data', error });
  }
});

/**
 * @route   GET /api/pricing
 * @desc    Get all pricing cards
 */
router.get('/', async (req, res) => {
  try {
    const allPricing = await Pricing.find();
    res.status(200).json(allPricing);
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to fetch pricing', error });
  }
});

/**
 * @route   GET /api/pricing/:id
 * @desc    Get single pricing card by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const card = await Pricing.findById(req.params.id);
    if (!card) return res.status(404).json({ message: '❌ Pricing card not found' });
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: '❌ Error fetching pricing card', err });
  }
});

/**
 * @route   POST /api/pricing
 * @desc    Add a new pricing card
 */
router.post('/', async (req, res) => {
  try {
    let { title, price, features, ctaText } = req.body;

    const allowedCTA = ['book', 'call', 'trial'];
    if (!allowedCTA.includes(ctaText)) {
      return res.status(400).json({ message: '❌ Invalid CTA type' });
    }

    const newCard = new Pricing({
      title,
      price,
      features,
      ctaText,
    });

    const saved = await newCard.save();
    res.status(201).json({ message: '✅ Pricing card added', data: saved });
  } catch (err) {
    res.status(500).json({ message: '❌ Error adding pricing card', err });
  }
});

/**
 * @route   PUT /api/pricing/:id
 * @desc    Update a pricing card
 */
router.put('/:id', async (req, res) => {
  try {
    let { title, price, features, ctaText } = req.body;

    const allowedCTA = ['book', 'call', 'trial'];
    if (!allowedCTA.includes(ctaText)) {
      return res.status(400).json({ message: '❌ Invalid CTA type' });
    }

    const updated = await Pricing.findByIdAndUpdate(
      req.params.id,
      { title, price, features, ctaText },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: '❌ Pricing card not found' });
    res.status(200).json({ message: '✅ Pricing card updated', data: updated });
  } catch (err) {
    res.status(500).json({ message: '❌ Error updating pricing card', err });
  }
});

/**
 * @route   DELETE /api/pricing/:id
 * @desc    Delete a pricing card
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Pricing.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: '❌ Pricing card not found' });
    res.status(200).json({ message: '✅ Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: '❌ Error deleting pricing card', err });
  }
});

export default router;

