import { Request, Response } from "express";
import Resource from "../models/Resource";

export const getResources = async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "20", category, featured } = req.query;
    const query: Record<string, unknown> = {};

    // if (category) query.category = category;

    if (category) {
      const Category = require("../models/Category").default;

      const foundCategory = await Category.findOne({
        slug: category,
      });

      if (foundCategory) {
        query.category = foundCategory._id;
      }
    }
    if (featured === "true") query.featured = true;

    const resources = await Resource.find(query)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
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

export const getResourceById = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findById(req.params.id).populate(
      "category",
      "name slug"
    );
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createResource = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.create(req.body);
    const populated = await resource.populate("category", "name slug");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("category", "name slug");
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json({ message: "Resource deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
