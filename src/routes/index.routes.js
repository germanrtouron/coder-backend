import express from "express";
import { productRouter } from "./api/product.routes.js";
import { userRouter } from "./api/user.routes.js";
import { authRouter } from "./api/auth.routes.js";
import { cartRouter } from "./api/cart.routes.js";
import { orderRouter } from "./api/order.routes.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);

export { router as apiRouter };
