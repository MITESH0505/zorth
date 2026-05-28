import { Router } from "express";
import {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController";
import { protect, adminOnly } from "../middleware/auth";
import { resourceValidation, mongoIdParam } from "../middleware/validation";

const router = Router();

router.get("/", getResources);
router.get("/:id", mongoIdParam, getResourceById);
router.post("/", protect, adminOnly, resourceValidation, createResource);
router.put("/:id", protect, adminOnly, mongoIdParam, updateResource);
router.delete("/:id", protect, adminOnly, mongoIdParam, deleteResource);

export default router;
