import express from "express";
import {} from "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";

const router = express.Router();

const validateCredential = [
  body("userID").trim().notEmpty(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password should be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!#%*?&]+$/
    )
    .withMessage(
      "Please use uppercase and lowercase letters and special characters."
    ),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("userName").notEmpty().withMessage("name is missing"),
  body("birthday").notEmpty().withMessage("invalid birthday"),
  body("university").notEmpty().withMessage("invalid university"),
  body("phone").notEmpty().withMessage("invalid phone"),
  validate,
];

router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateCredential, authController.login);

router.get("/me", isAuth, authController.me);

export default router;
