import { Router } from "express";
import { search, getSuggestions } from "../controllers/searchController";

const router = Router();

router.get("/", search);
router.get("/suggestions", getSuggestions);

export default router;
