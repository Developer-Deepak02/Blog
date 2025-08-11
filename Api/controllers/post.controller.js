// Import custom error handler and Post model
import { errorHandler } from "../utils/error.js";
import Post from "../Models/post.models.js";

// ─────────────────────────────────────────────
// CREATE A POST
/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Admin only
 */
export const create = async (req, res, next) => {
	try {
		// Authorization
		if (!req.user.isAdmin) {
			return next(errorHandler(403, "You are not allowed to create a post"));
		}

		const { title, content, category, image } = req.body;

		// Basic validation
		if (!title || !content) {
			return next(errorHandler(400, "Please provide all required fields"));
		}

		// Generate slug from title
		const slug = title
			.trim()
			.toLowerCase()
			.replace(/[^a-zA-Z0-9 ]/g, "") // remove special chars
			.replace(/\s+/g, "-"); // spaces to hyphens

		// Use fallback image if none provided
		const imageUrl =
			image ||
			"https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png";

		const newPost = new Post({
			title,
			content,
			category: category || "uncategorized",
			image: imageUrl,
			slug,
			userId: req.user.id,
		});

		const savedPost = await newPost.save();
		res.status(201).json(savedPost);
	} catch (error) {
		next(error);
	}
};

// ─────────────────────────────────────────────
// GET POSTS
/**
 * @desc    Fetch posts with filters, search, and pagination
 * @route   GET /api/posts
 * @access  Public/Admin
 */
export const getposts = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 9;
		const skip = (page - 1) * limit;
		const sortDirection = req.query.order === "asc" ? 1 : -1;

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

		const posts = await Post.find(filter)
			.sort({ updatedAt: sortDirection })
			.skip(skip)
			.limit(limit);

		const totalPosts = await Post.countDocuments(filter);
		const totalPages = Math.ceil(totalPosts / limit);

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

// ─────────────────────────────────────────────
// DELETE POST
/**
 * @desc    Delete a post by ID
 * @route   DELETE /api/posts/:postId
 * @access  Admin or Post Owner only
 */
export const deletepost = async (req, res, next) => {
	try {
		if (!req.user.isAdmin || req.user.id !== req.params.userId) {
			return next(errorHandler(403, "You are not allowed to delete this post"));
		}

		await Post.findByIdAndDelete(req.params.postId);
		res.status(200).json("Post has been deleted");
	} catch (error) {
		next(error);
	}
};

// ─────────────────────────────────────────────
// UPDATE POST
/**
 * @desc    Update an existing post
 * @route   PUT /api/posts/:postId
 * @access  Admin or Post Owner only
 */
export const updatepost = async (req, res, next) => {
	try {
		if (!req.user.isAdmin || req.user.id !== req.params.userId) {
			return next(errorHandler(403, "You are not allowed to update this post"));
		}

		const { title, content, category, image } = req.body;

		const updatedFields = {
			...(title && { title }),
			...(content && { content }),
			...(category && { category }),
			...(image && { image }),
		};

		const updatedPost = await Post.findByIdAndUpdate(
			req.params.postId,
			{ $set: updatedFields },
			{ new: true }
		);

		res.status(200).json(updatedPost);
	} catch (error) {
		next(error);
	}
};

// ─────────────────────────────────────────────
// SEARCH POSTS
/**
 * @desc    Search posts by keyword
 * @route   GET /api/posts/search
 * @access  Public
 */
export const searchPosts = async (req, res, next) => {
	try {
		const { q, page = 1, limit = 6 } = req.query;

		if (!q || q.trim() === "") {
			return res.status(400).json({ message: "Search query is required" });
		}

		const pageNum = parseInt(page, 10) || 1;
		const limitNum = parseInt(limit, 10) || 6;
		const skip = (pageNum - 1) * limitNum;

		const escapeRegex = (str) =>
			str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
		const sanitizedQuery = escapeRegex(q.trim());

		const searchQuery = {
			$or: [
				{ title: { $regex: sanitizedQuery, $options: "i" } },
				{ content: { $regex: sanitizedQuery, $options: "i" } },
			],
		};

		const totalPosts = await Post.countDocuments(searchQuery);

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
