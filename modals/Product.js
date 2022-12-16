const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("productData", productModel);

module.exports = model;
