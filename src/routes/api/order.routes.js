import express from "express";
import { orderController } from "../../controllers/api/order.controller.js";
import { checkUserLoggued } from "../../middlewares/user/checkUserLoggued.js";
import { checkUserRole } from "../../middlewares/user/checkUserRole.js";

const router = express.Router();

// Customer routes - they can view or add an order for the authenticated user.
router.get("/", checkUserLoggued, orderController.getAuthenticatedUserOrders);
router.post(
  "/",
  checkUserLoggued,
  orderController.generateOrderForAuthenticatedUserCart
);

//// Administrator routes - they can view or delete all orders from the database.
router.get(
  "/admin/",
  checkUserLoggued,
  checkUserRole,
  orderController.getOrders
);
router.get(
  "/admin/:orderID",
  checkUserLoggued,
  checkUserRole,
  orderController.getOrderById
);
router.get(
  "/admin/user/:userID",
  checkUserLoggued,
  checkUserRole,
  orderController.getOrdersByUserId
);
router.delete(
  "/admin/:orderID",
  checkUserLoggued,
  checkUserRole,
  orderController.deleteOrderById
);

export { router as orderRouter };
