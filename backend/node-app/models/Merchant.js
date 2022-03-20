const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MerchantSchema = new Schema({
  storeName: {
    type: String,
    required: true,
  },
  merchantName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imgCode: {
    type: String,
    required: true,
  },
  storeType: {
    type: String,
    required: true,
  },
  storeCity: {
    type: String,
    required: true,
  },
  goodsType: {
    type: Array,
    default: [],
  },
  goods: {
    goodsName: { type: String },
    type: { type: String },
    goodsPrice: { type: Number },
    imgCode: { type: String },
    desc: { type: String },
    date: { type: String },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  number: {
    type: Number,
    default: 0,
  },
  state: {
    type: Number,
    default: 0,
  },
});

module.exports = Merchant = mongoose.model("merchants", MerchantSchema);
