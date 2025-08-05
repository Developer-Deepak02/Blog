import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { deleteUser } from "../../../Api/controllers/user.controllers";
import { tailwindScrollbar } from 'tailwind-scrollbar';

const DashPosts = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [userPosts, setUserPosts] = useState([]);
	console.log(userPosts);
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
				const data = await res.json();
				if (res.ok) {
					setUserPosts(data.posts);
				}
			} catch (err) {
				console.log(err);
			}
		};
		if (currentUser.isAdmin) {
			fetchPosts();
		}
	}, [currentUser._id]);

	return (
		<div className="ml-10 mt-1 md:ml-9 table-auto overflow-x-scroll md:mx-auto lg:mx-auto p-3 tailwindScrollbar tailwindScrollbar-track-slate-100 tailwindScrollbar-thumb-slate-400 dark:tailwindScrollbar-track-slate-700 dark:tailwindScrollbar-thumb-slate-500">
			{currentUser.isAdmin && userPosts.length > 0 ? (
				<>
					<Table hoverable className="shadow-md">
						<TableHead>
							<TableHeadCell>Date Updated</TableHeadCell>
							<TableHeadCell>Post Image</TableHeadCell>
							<TableHeadCell>Post Title</TableHeadCell>
							<TableHeadCell>Category</TableHeadCell>
							<TableHeadCell>Delete</TableHeadCell>
							<TableHeadCell>
								<span>Edit</span>
							</TableHeadCell>
						</TableHead>
						{userPosts.map((post) => (
							<TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
								<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
									<TableCell>
										{new Date(post.createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell>
										<Link to={`/post/${post.slug}`}>
											<img
												src={post.image}
												alt={post.title}
												className="w-20 h-10 object-cover bg-gray-500"
											/>
										</Link>
									</TableCell>
									<TableCell className="max-w-[300px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[400px]">
										<Link
											className="block truncate whitespace-nowrap font-medium text-gray-900 dark:text-white"
											to={`/post/${post.slug}`}
										>
											{post.title}
										</Link>
									</TableCell>
									<TableCell>{post.category}</TableCell>
									<TableCell>
										<span className=" font-medium text-red-500 cursor-pointer hover:underline">
											Delete
										</span>
									</TableCell>
									<TableCell>
										<Link
											className="text-teal-500 hover:underline "
											to={`/post/${post._id}`}
										>
											<span>Edit</span>
										</Link>
									</TableCell>
								</TableRow>
							</TableBody>
						))}
					</Table>
				</>
			) : (
				<p>No Posts Found</p>
			)}
		</div>
	);
};

export default DashPosts;
