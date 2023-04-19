import express from "express";
import { AuthController } from "../../controllers/api/auth.controller.js";

const router = express.Router();

router.post("/login", AuthController.postLoginPassport, AuthController.postLogin);
router.post("/loginError", AuthController.signupError);
router.post("/signup", AuthController.postSignupPassport, AuthController.postSignup);
router.post("/signupError", AuthController.signupError);
router.post("/logout", AuthController.logout);

export {router as authRouter};