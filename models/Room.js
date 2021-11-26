const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
});

module.exports = mongoose.model('room', roomSchema);
