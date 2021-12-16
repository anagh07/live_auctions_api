const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  purchasedProducts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'ad',
    },
  ],
  postedAds: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'ad',
    },
  ],
  bids: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'ad',
    },
  ],
});

module.exports = mongoose.model('user', userSchema);
