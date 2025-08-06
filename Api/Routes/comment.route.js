import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createCommnet } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createCommnet);

export default router;