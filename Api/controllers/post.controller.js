// Import custom error handler and Post model
import { errorHandler } from "../utils/error.js";
import Post from "../Models/post.models.js";
import { verifyToken } from "../utils/verifyUser.js";

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
		// Pagination setup
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 9;
		const skip = (page - 1) * limit;
		const sortDirection = req.query.order === "asc" ? 1 : -1;

		// Build filter with search in title, content, category
		let filter = {
			...(req.query.userId && { userId: req.query.userId }),
			...(req.query.category && { category: req.query.category }),
			...(req.query.slug && { slug: req.query.slug }),
			...(req.query.postId && { _id: req.query.postId }),
		};

		if (req.query.searchTerm) {
			const searchRegex = { $regex: req.query.searchTerm, $options: "i" };
			filter.$or = [
				{ title: searchRegex },
				{ content: searchRegex },
				{ category: searchRegex },
			];
		}

		// Fetch posts
		const posts = await Post.find(filter)
			.sort({ updatedAt: sortDirection })
			.skip(skip)
			.limit(limit);

		// Count total posts
		const totalPosts = await Post.countDocuments(filter);
		const totalPages = Math.ceil(totalPosts / limit);

		// Count posts from last month
		const now = new Date();
		const oneMonthAgo = new Date(
			now.getFullYear(),
			now.getMonth() - 1,
			now.getDate()
		);
		const lastMonthPosts = await Post.countDocuments({
			...filter,
			createdAt: { $gte: oneMonthAgo },
		});

		res.status(200).json({
			posts,
			totalPosts,
			totalPages,
			currentPage: page,
			lastMonthPosts,
		});
	} catch (error) {
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

// upating post

export const updatepost = async (req, res, next) => {
	if (!req.user.isAdmin || req.user.id !== req.params.userId) {
		return next(errorHandler(403, "You are not allowed to update this post"));
	}
	try {
		const UpdatePost = await Post.findByIdAndUpdate(
			req.params.postId,
			{
				$set: {
					title: req.body.title,
					content: req.body.content,
					category: req.body.category,
					image: req.body.image,
				},
			},
			{ new: true })
			res.status(200).json(UpdatePost);
	} catch (error) {
		next(error);
	}
};

// Search posts
export const searchPosts = async (req, res, next) => {
	try {
		const { q, page = 1, limit = 6 } = req.query;

		if (!q || q.trim() === "") {
			return res.status(400).json({ message: "Search query is required" });
		}

		// Parse page and limit to integers and set defaults
		const pageNum = parseInt(page, 10) || 1;
		const limitNum = parseInt(limit, 10) || 6;
		const skip = (pageNum - 1) * limitNum;

		const escapeRegex = (str) =>
			str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
		const sanitizedQuery = escapeRegex(q.trim());

		// Build search query
		const searchQuery = {
			$or: [
				{ title: { $regex: sanitizedQuery, $options: "i" } },
				{ content: { $regex: sanitizedQuery, $options: "i" } },
			],
		};

		// Get total count for pagination
		const totalPosts = await Post.countDocuments(searchQuery);

		// Get posts with pagination
		const posts = await Post.find(searchQuery)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limitNum);

		const totalPages = Math.ceil(totalPosts / limitNum);

		res.status(200).json({ posts, totalPages });
	} catch (error) {
		next(error);
	}
};

