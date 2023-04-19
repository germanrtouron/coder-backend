import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 40 },
    description: { type: String, required: true, max: 300 },
    code: { type: String, required: true },
    thumbnail: { type: String, required: true, max: 200 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

export const productModel = mongoose.model(productsCollection, productSchema);
