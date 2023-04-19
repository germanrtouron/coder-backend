import mongoose from "mongoose";

const orderCollection = "orders";

const orderSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: Object, required: true },
    products: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model(orderCollection, orderSchema);
