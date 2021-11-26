const mongoose = require('mongoose');
const types = mongoose.Types;

const adSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: types.Decimal128,
    required: true,
  },
  duration: {
    type: Number,
    default: 300,
  },
  timer: {
    type: Number,
    default: 300,
  },
  soldAt: {
    type: DataTypes.DATE,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  catergory: {
    type: String,
    required: false,
  },
  auctionStarted: {
    type: Boolean,
    default: false,
  },
  auctionEnded: {
    type: Boolean,
    default: false,
  },
  sold: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('ad', adSchema);
