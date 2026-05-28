import { Router } from "express";
import Resource from "../models/Resource";


const router = Router();

router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find().populate("category");

    res.json(resources);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resources",
    });
  }
});

export default router;