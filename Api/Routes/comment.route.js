import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createCommnet, getPostComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createCommnet);
router.get('/getPostComments/:postId' , getPostComments)

export default router;