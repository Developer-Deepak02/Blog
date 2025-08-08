import { errorHandler } from "../utils/error.js";
import Comment from "../Models/comment.model.js";

export const createCommnet = async (req, res, next) => {
	try {
		const { content, postId, userId } = req.body;
		if (userId !== req.user.id) {
			return next(errorHandler(403, "You are not allowed to create a comment"));
		}

		const newComment = new Comment({
			content,
			postId,
			userId,
		});

		await newComment.save();
		res.status(201).json(newComment);
	} catch (error) {
		next(error);
	}
};

export const getPostComments = async (req, res, next) => {
	try {
		const postId = req.params.postId;
		const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
		res.status(200).json(comments);
	} catch (error) {
		next(error);
	}
};

//  like commnet

export const likeComment = async (req, res, next) => {
	try {
		const commentId = req.params.commentId;
		const comment = await Comment.findById(commentId);
		if (!comment) {
			return next(errorHandler(404, "Comment not found"));
		}
		const userIndex = comment.likes.findIndex((id) => id === req.user.id);
		if (userIndex === -1) {
			// User has not liked the comment
			comment.numberOfLikes += 1;
			comment.likes.push(req.user.id);
		} else {
			// User has already liked the comment
			comment.numberOfLikes -= 1;
			comment.likes.splice(userIndex, 1);
		}
		// Save the updated comment
		await comment.save();
		res.status(200).json(comment);
	} catch (error) {
		// handle errors
		next(error);
	}
};

// edit comment

export const editComment = async (req, res, next) => {
	try {
		const comment = await Comment.findById(req.params.commentId);
		if (!comment) {
			return next(errorHandler(404, "Comment not found"));
		}
		if (comment.userId !== req.user.id && !req.user.isAdmin) {
			return next(
				errorHandler(403, "You are not allowed to edit this comment")
			);
		}
		const editedComment = await Comment.findByIdAndUpdate(
			req.params.commentId,
			{
				content: req.body.content,
			},
			{ new: true }
		);
		res.status(200).json(editedComment);
	} catch (error) {
		next(error);
	}
};

// delete commnet
export const deleteComment = async (req, res, next) => {
	try {
		const comment = await Comment.findById(req.params.commentId);
		if (!comment) {
			return next(errorHandler(404, "Comment not found"));
		}
		if (comment.userId !== req.user.id) {
			return next(
				errorHandler(403, "You are not allowed to delete this comment")
			);
		}
		await Comment.findByIdAndDelete(req.params.commentId);
		res.status(200).json("Comment has been deleted");
	} catch (error) {
		next(error);
	}
};

export const getComments = async (req, res, next) => {
	if (!req.user.isAdmin)
		return next(errorHandler(403, "You are not allowed to get all comments"));
	try {
		const startIndex = parseInt(req.query.startIndex) || 0;
		const limit = parseInt(req.query.limit) || 9;
		const sortDirection = req.query.sort === "desc" ? -1 : 1;
		const comments = await Comment.find()
			.sort({ createdAt: sortDirection })
			.skip(startIndex)
			.limit(limit);
		const totalComments = await Comment.countDocuments();
		const now = new Date();
		const oneMonthAgo = new Date(
			now.getFullYear(),
			now.getMonth() - 1,
			now.getDate()
		);
		const lastMonthComments = await Comment.countDocuments({
			createdAt: { $gte: oneMonthAgo },
		});
		res.status(200).json({ comments, totalComments, lastMonthComments });
	} catch (error) {
		next(error);
	}
}
