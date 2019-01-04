const mongoose = require("mongoose");

const Schma = mongoose.Schema;
const eventSchema = new Schma({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schma.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Event', eventSchema);