import { Request, Response } from "express";
import Category from "../models/Category";
import Resource from "../models/Resource";

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Resource.countDocuments({ category: cat._id });
        return { ...cat.toObject(), count };
      })
    );
    res.json(categoriesWithCount);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const count = await Resource.countDocuments({ category: category._id });
    res.json({ ...category.toObject(), count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, icon, description } = req.body;
    const existing = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = await Category.create({ name, slug, icon, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await Resource.updateMany(
      { category: req.params.id },
      { $unset: { category: "" } }
    );
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
