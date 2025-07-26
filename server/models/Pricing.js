import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
  title: String,
  price: Number,
  features: [String],
  ctaText: {
    type: String,
    enum: ['book', 'call', 'trial'],
    default: 'book'
  }
});

const Pricing = mongoose.model('Pricing', pricingSchema);
export default Pricing;
