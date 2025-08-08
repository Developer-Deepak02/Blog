import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
	Alert,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	Textarea,
} from "flowbite-react";
import { useState, useEffect } from "react";
import Comment from "./Comment.jsx";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const CommentSection = ({ postId: propPostId }) => {
	const { currentUser } = useSelector((state) => state.user);
	const { postId: paramPostId } = useParams();
	const [comment, setComment] = useState("");
	const [commentError, setCommentError] = useState(null);
	const [comments, setComments] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [commentToDelete, setCommentToDelete] = useState(null);
	const navigate = useNavigate();

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
				setComments([data, ...comments]);
			}
		} catch (error) {
			setCommentError(error.message);
		}
	};

	// Fetch comments when postId changes
	useEffect(() => {
		const getComments = async () => {
			try {
				const res = await fetch(`/api/comment/getPostComments/${postId}`);
				if (res.ok) {
					const data = await res.json();
					setComments(data);
				}
			} catch (error) {
				console.log(error.message);
			}
		};

		getComments();
	}, [postId]);

	const handleLike = async (commentId) => {
		try {
			if (!currentUser) {
				return navigate("/signin");
			}
			const res = await fetch(`/api/comment/likeComment/${commentId}`, {
				method: "PUT",
			});

			if (res.ok) {
				const data = await res.json();

				setComments((prevComments) =>
					prevComments.map((comment) =>
						comment._id === commentId
							? {
									...comment,
									likes: data.likes,
									numberOfLikes: data.likes.length,
							  }
							: comment
					)
				);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	// handel edit function
	const handleEdit = async (comment, editedContent) => {
		setComments(
			comments.map((c) =>
				c._id === comment._id ? { ...c, content: editedContent } : c
			)
		);
	};

	// handel delete function
	const handleDelete = async (commentId) => {
		try {
			if (!currentUser) {
				return navigate("/signin");
			}
			const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
				method: "DELETE",
			});
			if (res.ok) {
				const data = await res.json();
				setComments(comments.filter((c) => c._id !== commentId));
				setShowModal(false);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="max-w-2xl mx-auto w-full p-3">
			{currentUser ? (
				<div className="flex items-center gap-1 my-5 text-gray-500  dark:text-gray-400 text-sm">
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
				<div className="text-sm text-gray-500 dark:text-gray-400 my-5">
					You need to sign in to comment.
					<Link className="text-blue-500 hover:underline" to={"/signin"}>
						{" "}
						sign in
					</Link>
				</div>
			)}
			{currentUser && (
				<form
					className="border border-gray-200 dark:border-gray-700 rounded-md p-3"
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
			{comments.length === 0 ? (
				<p className="text-gray-500 text-sm my-5">No comments yet</p>
			) : (
				<>
					<div className="text-sm text-gray-500 my-5 flex items-center gap-1">
						<p>Comments</p>
						<div className="border border-gray-300 rounded-md py-1 px-2 flex items-center gap-1">
							<p>{comments.length}</p>
						</div>
					</div>
					{comments.map((comment) => (
						<Comment
							key={comment._id}
							comment={comment}
							onLike={handleLike}
							onEdit={handleEdit}
							onDelete={(commentId) => {
								setCommentToDelete(commentId);
								setShowModal(true);
							}}
						/>
					))}
				</>
			)}
			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				popup
				size="md"
			>
				<ModalHeader />
				<ModalBody>
					<div className="text-center">
						<HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
						<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this Comment ?
						</h3>
						<div className="flex justify-center gap-6">
							<Button
								// color="failure"
								className="bg-red-700 hover:bg-red-800 text-white"
								onClick={() => handleDelete(commentToDelete)}
							>
								Yes, delete Post
							</Button>
							<Button color={"gray"} onClick={() => setShowModal(false)}>
								No, cancel
							</Button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default CommentSection;
