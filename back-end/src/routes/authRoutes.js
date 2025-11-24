import { Router } from "express";
import { validate } from "../middleware/validates/handleValidate.js";
import { register, login, logout, me } from "../controllers/authController.js";
import {
  registerValidation,
  loginValidation,
} from "../middleware/validates/authValidates.js";
import authGuard from "../middleware/authGuard.js";
const router = Router();

router
  .post("/register", registerValidation(), validate, register)
  .post("/login", loginValidation(), validate, login)
  .post("/logout", authGuard, logout)
  .get("/me", authGuard, me);

export default router;
