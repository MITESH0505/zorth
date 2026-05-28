import { Request, Response } from "express";
import User from "../models/User";

export const getBookmarks = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).populate({
      path: "bookmarks",
      populate: { path: "category", select: "name slug" },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const addBookmark = async (req: Request, res: Response) => {
  try {
    const { resourceId } = req.body;
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.bookmarks.includes(resourceId)) {
      return res.status(400).json({ message: "Already bookmarked" });
    }

    user.bookmarks.push(resourceId);
    await user.save();

    res.json({ message: "Bookmark added", bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const removeBookmark = async (req: Request, res: Response) => {
  try {
    const { resourceId } = req.params;
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bookmarks = user.bookmarks.filter(
      (id) => id.toString() !== resourceId
    );
    await user.save();

    res.json({ message: "Bookmark removed", bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
