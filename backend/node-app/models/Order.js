const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  merchantName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  orderName: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  takeName: {
    type: String,
    required: true,
  },
  takePhone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  evaluation: {
    content: {
      type: String,
    },
    score: {
      type: String,
    },
    date: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  state: {
    type: Number,
    default: 0,
  },
});

module.exports = Order = mongoose.model("orders", OrderSchema);
