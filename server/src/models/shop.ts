import productSchema from "./product";

const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  shopPhoto: String,

  dateCreated: {
    type: Date,
    default: Date.now,
  },
  products: [productSchema],
});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
