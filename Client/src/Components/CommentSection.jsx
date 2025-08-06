import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { set } from "mongoose";

const CommentSection = ({ postId: propPostId }) => {
	const { currentUser } = useSelector((state) => state.user);
	const { postId: paramPostId } = useParams();
	const [comment, setComment] = useState("");
	const [commentError, setCommentError] = useState(null);

	const postId = propPostId || paramPostId; // Use prop if passed, else fallback to URL param

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (comment.length > 200) return;
		try {
			const res = await fetch("/api/comment/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: comment,
					userId: currentUser._id,
					postId,
				}),
			});

			const data = await res.json();
			if (res.ok) {
				setComment("");
				setCommentError(null);
			}
		} catch (error) {
			setCommentError(error.message);
		}
	};

	return (
		<div className="max-w-2xl mx-auto w-full p-3">
			{currentUser ? (
				<div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
					<p>Sign in as</p>
					<Link
						className="text-blue-500 hover:underline"
						to={"/dashboard?tab=profile"}
					>
						@{currentUser.username}
					</Link>
					<img
						className="h-5 w-5 rounded-full object-cover"
						src={currentUser.profilePicture}
						alt=""
					/>
				</div>
			) : (
				<div className="text-sm text-gray-500 my-5">
					You need to sign in to comment.
					<Link className="text-blue-500 hover:underline" to={"/signin"}>
						{" "}
						sign in
					</Link>
				</div>
			)}
			{currentUser && (
				<form
					className="border border-gray-200 rounded-md p-3"
					onSubmit={handleSubmit}
				>
					<Textarea
						placeholder="Add a comment..."
						rows={4}
						maxLength={200}
						onChange={(e) => setComment(e.target.value)}
						value={comment}
					/>
					<div className="flex items-center justify-between mt-5">
						<p className="text-gray-500 text-sm">
							{200 - comment.length} characters remaining
						</p>
						<Button outline type="submit" className="cursor-pointer">
							Post Comment
						</Button>
					</div>
					{commentError && (
						<Alert className="mt-5" color="failure">
							{commentError}
						</Alert>
					)}
				</form>
			)}
		</div>
	);
};

export default CommentSection;
