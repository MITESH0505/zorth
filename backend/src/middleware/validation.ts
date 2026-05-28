import { body, param, query } from "express-validator";

export const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required"),
];

export const categoryValidation = [
  body("name").trim().notEmpty().withMessage("Category name required"),
  body("slug").trim().notEmpty().withMessage("Slug required"),
  body("icon").trim().notEmpty().withMessage("Icon required"),
  body("description").trim().notEmpty().withMessage("Description required"),
];

export const resourceValidation = [
  body("title").trim().notEmpty().withMessage("Title required"),
  body("url").isURL().withMessage("Valid URL required"),
  body("description").trim().notEmpty().withMessage("Description required"),
  body("category").isMongoId().withMessage("Valid category ID required"),
];

export const mongoIdParam = [
  param("id").isMongoId().withMessage("Invalid ID format"),
];
