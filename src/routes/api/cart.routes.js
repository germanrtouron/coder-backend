import express from "express";
import { cartController } from "../../controllers/api/cart.controller.js";
import { checkUserLoggued } from "../../middlewares/user/checkUserLoggued.js";
import { checkUserRole } from "../../middlewares/user/checkUserRole.js";
import { validateProductProperty } from "../../middlewares/cart/validateProductProperty.js";
import { validateProductQuantityProperty } from "../../middlewares/cart/validateProductQuantityProperty.js";

const router = express.Router();

// Customer routes - they can only create and modify the shopping cart corresponding to the authenticated user.
router.get("/", checkUserLoggued, cartController.getAuthenticatedUserCart);
router.post(
  "/",
  checkUserLoggued,
  validateProductProperty,
  cartController.addProductToCart
);
router.put(
  "/:productID",
  checkUserLoggued,
  validateProductQuantityProperty,
  cartController.updateProductQuantityInCart
);
router.delete(
  "/:productID",
  checkUserLoggued,
  cartController.deleteProductFromCart
);
router.delete("/", checkUserLoggued, cartController.deleteCart);

// Administrator routes - they can modify the shopping cart of any user in the database.
router.get("/admin/", checkUserLoggued, checkUserRole, cartController.getCarts);
router.get(
  "/admin/:id",
  checkUserLoggued,
  checkUserRole,
  cartController.getCartById
);
router.post(
  "/admin/:cartID",
  checkUserLoggued,
  checkUserRole,
  validateProductProperty,
  cartController.addProductToAnyCart
);
router.put(
  "/admin/:cartID/:productID",
  checkUserLoggued,
  checkUserRole,
  validateProductQuantityProperty,
  cartController.updateProductQuantityInAnyCarts
);
router.delete(
  "/admin/:cartID/:productID",
  checkUserLoggued,
  checkUserRole,
  cartController.deleteProductFromAnyCart
);
router.delete(
  "/admin/:cartID",
  checkUserLoggued,
  checkUserRole,
  cartController.deleteAnyCart
);

export { router as cartRouter };
