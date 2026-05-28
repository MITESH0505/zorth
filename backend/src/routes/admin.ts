import { Router } from "express";
import Resource from "../models/Resource";
import User from "../models/User";
import Category from "../models/Category";
import { protect, adminOnly } from "../middleware/auth";

const router = Router();

router.get("/dashboard", protect, adminOnly, async (_req, res) => {
  try {
    const [resources, categories, users] = await Promise.all([
      Resource.countDocuments(),
      Category.countDocuments(),
      User.countDocuments(),
    ]);

    res.json({ resources, categories, users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/resources/pending", protect, adminOnly, async (_req, res) => {
  try {
    const resources = await Resource.find({ featured: false })
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put(
  "/resources/:id/feature",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const resource = await Resource.findByIdAndUpdate(
        req.params.id,
        { featured: req.body.featured },
        { new: true }
      );
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

export default router;
