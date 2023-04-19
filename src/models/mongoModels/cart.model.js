import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, max: 40 },
    email: { type: String, required: true, max: 60 },
    address: { type: Object, required: true },
    products: { type: Array, required: true, max: 300 },
  },
  { timestamps: true }
);

export const cartModel = mongoose.model(cartCollection, cartSchema);
