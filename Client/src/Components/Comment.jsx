import React, { useEffect, useState } from "react";
import moment from "moment";

const Comment = ({ comment }) => {
	const [user, setUser] = useState({});
	console.log(user);
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

	return (
		<div className="flex p-4 border-b dark:border-gray-300 border-gray-100 text-sm">
			<div className="flex-shrink-0 mr-3">
				<img
					className="w-10 h-10 rounded-full object-cover"
					src={user.profilePicture}
					alt={user.username}
				/>
			</div>
			<div className="flex-1">
				<div className="flex items-center mb-2">
					<span className="text-sm font-semibold mr-1 truncate text-gray-700">
						{user ? `@${user.username}` : `Anonymous User`}
					</span>
					<span className="text-xs text-gray-500">
						{moment(comment.createdAt).fromNow()}
					</span>
				</div>
        <p className="text-gray-500 mb-2">{comment.content}</p>
			</div>
		</div>
	);
};

export default Comment;
