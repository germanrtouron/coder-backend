import express from "express";
import { userController } from "../../controllers/api/user.controller.js";
import { checkUserLoggued } from "../../middlewares/user/checkUserLoggued.js";
import { checkUserRole } from "../../middlewares/user/checkUserRole.js";

const router = express.Router();

// Customer routes - display authenticated user information.
router.get("/", checkUserLoggued, userController.getUserAuthenticated);

// Administrator routes - they can view, add, modify, or delete any user in the database.
router.get("/admin/", checkUserLoggued, checkUserRole, userController.getUsers);
// The DTO route displays users with the fields full name, email, and admin.
router.get(
  "/admin/dto",
  checkUserLoggued,
  checkUserRole,
  userController.getUsersDto
);
router.get(
  "/admin/:id",
  checkUserLoggued,
  checkUserRole,
  userController.getUser
);
router.post(
  "/admin/",
  checkUserLoggued,
  checkUserRole,
  userController.saveUser
);
router.delete(
  "/admin/:id",
  checkUserLoggued,
  checkUserRole,
  userController.deleteUser
);

export { router as userRouter };
