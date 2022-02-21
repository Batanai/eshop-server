import express from "express";
import dotenv from "dotenv";

import { postCategory } from "../controllers/categoryController.js";

const router = express.Router();

// post categories
router.post("", postCategory);

export default router;
