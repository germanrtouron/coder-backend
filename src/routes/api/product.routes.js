import express from "express";
import { productController } from "../../controllers/api/product.controller.js";
import { checkUserLoggued } from "../../middlewares/user/checkUserLoggued.js";
import { checkUserRole } from "../../middlewares/user/checkUserRole.js";

const router = express.Router();

// Customer routes - display product information in the database.
router.get("/", checkUserLoggued, productController.getProducts);
router.get("/:id", checkUserLoggued, productController.getProduct);

// Administrator routes - they can add, modify or delete products in the database.
router.post(
  "/admin/",
  checkUserLoggued,
  checkUserRole,
  productController.saveProduct
);
router.put(
  "/admin/:id",
  checkUserLoggued,
  checkUserRole,
  productController.updateProduct
);
router.delete(
  "/admin/:id",
  checkUserLoggued,
  checkUserRole,
  productController.deleteProduct
);
router.delete(
  "/admin/",
  checkUserLoggued,
  checkUserRole,
  productController.deleteProducts
);

export { router as productRouter };
