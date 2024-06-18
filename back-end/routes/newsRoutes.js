import express from "express";
import { getAllNews } from "../controllers/newsController.js";

const router = express.Router();

router.get("/all", getAllNews);

export default router;
