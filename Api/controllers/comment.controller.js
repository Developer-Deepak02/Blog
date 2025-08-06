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
