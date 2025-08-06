// Import custom error handler and Post model
import { errorHandler} from "../utils/error.js";
import Post from "../Models/post.models.js";
import { verifyToken } from '../utils/verifyUser.js';

// creating post
/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Admin only
 */
export const create = async (req, res, next) => {
	// Check if the user is an admin
	if (!req.user.isAdmin) {
		return next(errorHandler(403, "You are not allowed to create a post"));
	}
	// Check if the user is an admin
	if (!req.body.title || !req.body.content) {
		return next(errorHandler(400, "Please provide all required fields"));
	}
	// Generate slug from title (URL-friendly string)
	const slug = req.body.title
		.split(" ")
		.join("-")
		.toLowerCase()
		.replace(/[^a-zA-Z0-9-]/g, "");
	// Create new post instance
	const newPost = new Post({
		...req.body,
		slug,
		userId: req.user.id,
	});
	try {
		// Save post to database
		const savedPost = await newPost.save();
		res.status(201).json(savedPost);
	} catch (error) {
		// Handle server errors
		next(error);
	}
};

// get post from database
/**
 * @desc    Fetch posts with filters, search, and pagination
 * @route   GET /api/posts
 * @access  Public/Admin
 */
export const getposts = async (req, res, next) => {
	try {
		// Parse query parameters
		const startIndex = parseInt(req.query.startIndex) || 0;
		const limit = parseInt(req.query.limit) || 9;
		const sortDirection = req.query.order === "asc" ? 1 : -1;
		// fetch posts
		const posts = await Post.find({
			...(req.query.userId && { userId: req.query.userId }),
			...(req.query.category && { category: req.query.category }),
			...(req.query.slug && { slug: req.query.slug }),
			...(req.query.postId && { _id: req.query.postId }),
			...(req.query.searchTerm && {
				$or: [
					{ title: { $regex: req.query.searchTerm, $options: "i" } },
					{ content: { $regex: req.query.searchTerm, $options: "i" } },
				],
			}),
		})
			.sort({ updatedAt: sortDirection })
			.skip(startIndex)
			.limit(limit);
		// Count total number of posts
		const totalPosts = await Post.countDocuments();
		// Count total number of posts
		const now = new Date();
		const oneMonthAgo = new Date(
			now.getFullYear(),
			now.getMonth() - 1,
			now.getDate()
		);

		const lastMonthPosts = await Post.countDocuments({
			createdAt: { $gte: oneMonthAgo },
		});

		// Send response with posts and stats
		res.status(200).json({
			posts,
			totalPosts,
			lastMonthPosts,
		});
	} catch (error) {
		// Handle errors
		next(error);
	}
};

// delete post

/**
 * @desc    Delete a post by ID
 * @route   DELETE /api/posts/:postId
 * @access  Admin or Post Owner only
 */
export const deletepost = async (req, res, next) => {
	// Check if user is an admin or the owner of the post
	if (!req.user.isAdmin || req.user.id !== req.params.userId) {
		return next(errorHandler(403, "You are not allowed to delete this post"));
	}
	try {
		// Delete the post from the database using postId from request params
		await Post.findByIdAndDelete(req.params.postId);
		// Send success response
		res.status(200).json("Post has been deleted");
	} catch (error) {
		// Handle any database/server errors
		next(error);
	}
};
