import { Router } from "express";
import {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { protect, adminOnly } from "../middleware/auth";
import { categoryValidation, mongoIdParam } from "../middleware/validation";

const router = Router();

router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);
router.post("/", protect, adminOnly, categoryValidation, createCategory);
router.put("/:id", protect, adminOnly, mongoIdParam, updateCategory);
router.delete("/:id", protect, adminOnly, mongoIdParam, deleteCategory);

export default router;
