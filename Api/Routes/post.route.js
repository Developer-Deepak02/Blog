import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
	create,
	deletepost,
	getposts,
	updatepost,
	searchPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

// Create post
router.post("/create", verifyToken, create);

// Get all posts
router.get("/getposts", getposts);

// Delete post
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);

// Update post
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);

// Search posts
router.get("/search", searchPosts);

export default router;