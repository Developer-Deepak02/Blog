import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

const Comment = ({ comment, onLike, onEdit , onDelete}) => {
	const { currentUser } = useSelector((state) => state.user);
	const [user, setUser] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [editedContent, setEditedContent] = useState(comment.content);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await fetch(`/api/user/${comment.userId}`);
				const data = await res.json();
				if (res.ok) {
					setUser(data);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		getUsers();
	}, [comment]);

	const handleEdit = () => {
		setIsEditing(true);
		setEditedContent(comment.content);
	};

	const handleSave = async () => {
		try {
			const res = await fetch(`/api/comment/editComment/${comment._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ content: editedContent }),
			});
			if (res.ok) {
				setIsEditing(false);
				onEdit(comment, editedContent);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="flex p-4 border-b dark:border-gray-600 border-gray-100 text-sm">
			<div className="flex-shrink-0 mr-3">
				<img
					className="w-10 h-10 rounded-full object-cover"
					src={user.profilePicture}
					alt={user.username}
				/>
			</div>
			<div className="flex-1">
				<div className="flex items-center mb-2">
					<span className="text-sm font-semibold mr-1 truncate text-gray-700 dark:text-gray-300">
						{user?.username ? `@${user.username}` : `Anonymous User`}
					</span>
					<span className="text-xs text-gray-500">
						{moment(comment.createdAt).fromNow()}
					</span>
				</div>
				{isEditing ? (
					<>
						<Textarea
							className="mb-2"
							value={editedContent}
							onChange={(e) => setEditedContent(e.target.value)}
						/>
						<div className="flex justify-end gap-2 text-xs">
							<Button
								className="cursor-pointer"
								type="button"
								size="xs"
								onClick={handleSave}
							>
								Save
							</Button>
							<Button
								className="cursor-pointer"
								type="button"
								size="xs"
								outline
								onClick={() => setIsEditing(false)}
							>
								Cancel
							</Button>
						</div>
					</>
				) : (
					<>
						<p className="text-gray-500 dark:text-gray-400 mb-2">{comment.content}</p>
						<div className=" flex item-center gap-1 pt-2 text-xs ">
							<button
								type="button"
								onClick={() => onLike(comment._id)}
								className={`text-gray-500 hover:text-blue-500 cursor-pointer ${
									currentUser && comment.likes.includes(currentUser._id)
										? "!text-blue-500"
										: "text-gray-500"
								}`}
							>
								<FaThumbsUp className="text-sm" />
							</button>
							<p className="text-xs text-gray-500 ml-1 mt-1">
								{comment.numberOfLikes > 0 &&
									comment.numberOfLikes +
										" " +
										(comment.numberOfLikes > 1 ? "likes" : "like")}
							</p>
							{currentUser && currentUser._id === comment.userId && (
								<>
									<button
										onClick={handleEdit}
										type="button"
										className="text-gray-400 hover:text-blue-500 cursor-pointer mt-1"
									>
										Edit
									</button>
									<button
										onClick={()=>onDelete(comment._id)}
										type="button"
										className="text-gray-400 hover:text-red-500 cursor-pointer mt-1"
									>
										Delete
									</button>
								</>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Comment;
