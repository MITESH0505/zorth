import { Router } from "express";
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from "../controllers/bookmarkController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", protect, getBookmarks);
router.post("/", protect, addBookmark);
router.delete("/:resourceId", protect, removeBookmark);

export default router;
