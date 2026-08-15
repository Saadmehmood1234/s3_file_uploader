import { Router } from "express";
import {
  fetchUser,
  signin,
  signout,
  signup,
  verifyUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validationMiddleware } from "../middleware/validation.middleware.js";
import { signinSchema, signupSchema } from "../validators/auth.schema.js";

const router = Router();

router.post("/signup", validationMiddleware(signupSchema), signup);
router.post("/login",validationMiddleware(signinSchema), signin);
router.post("/logout", protect, signout);
router.get("/verify", verifyUser);
router.get("/me", protect, fetchUser);

export default router;
