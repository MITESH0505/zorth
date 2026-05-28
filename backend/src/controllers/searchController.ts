import { Request, Response } from "express";
import Resource from "../models/Resource";
import Category from "../models/Category";

export const search = async (req: Request, res: Response) => {
  try {
    const { q, category, tags, page = "1", limit = "20" } = req.query;

    if (!q && !category && !tags) {
      return res.status(400).json({ message: "Search query required" });
    }

    const query: Record<string, unknown> = {};

    if (q) {
      query.$text = { $search: q as string };
    }

    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) query.category = cat._id;
    }

    if (tags) {
      const tagArray = (tags as string).split(",").map((t) => t.trim());
      query.tags = { $in: tagArray };
    }

    const resources = await Resource.find(query)
      .populate("category", "name slug")
      .sort({ rating: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Resource.countDocuments(query);

    res.json({
      data: resources,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSuggestions = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.json({ resources: [], categories: [] });
    }

    const regex = new RegExp(q as string, "i");

    const [resources, categories] = await Promise.all([
      Resource.find({ title: regex })
        .select("title category")
        .populate("category", "name")
        .limit(5),
      Category.find({ name: regex }).select("name slug").limit(3),
    ]);

    res.json({ resources, categories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
