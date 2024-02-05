import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  productPhoto: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

export default productSchema;
