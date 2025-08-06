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
import { tailwindScrollbar } from "tailwind-scrollbar";

const DashPosts = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [userPosts, setUserPosts] = useState([]);
	const [showMore, setShowMore] = useState(true);
	console.log(userPosts);
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
				const data = await res.json();
				if (res.ok) {
					setUserPosts(data.posts);
					if (data.posts.length < 9) {
						setShowMore(false);
					}
				}
			} catch (err) {
				console.log(err);
			}
		};
		if (currentUser.isAdmin) {
			fetchPosts();
		}
	}, [currentUser._id]);

	// show more button -->
	const handleShowMore = async () => {
		const startIndex = userPosts.length;
		try {
			const res = await fetch(
				`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
			);
			const data = await res.json();
			if (res.ok) {
				setUserPosts((prev) => [...prev, ...data.posts]);
				if (data.posts.length < 9) {
					setShowMore(false);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="mx-auto mt-9 p-3">
			{currentUser.isAdmin && userPosts.length > 0 ? (
				<>
					{/* Horizontal & vertical scroll container */}
					<div className="relative max-w-full overflow-x-auto max-h-[60vh] lg:max-h-[80vh] rounded-md border border-gray-200 dark:border-gray-700">
						<div className="w-[24rem] md:w-[30rem] lg:w-[80rem] mx-auto overflow-y-auto  ">
							<Table>
								<TableHead className="sticky top-0 z-20 bg-white dark:bg-gray-900">
									<TableHeadCell className="sticky top-0 bg-white dark:bg-gray-900 z-20">
										Date Updated
									</TableHeadCell>
									<TableHeadCell className="sticky top-0 bg-white dark:bg-gray-900 z-20">
										Post Image
									</TableHeadCell>
									<TableHeadCell className="sticky top-0 bg-white dark:bg-gray-900 z-20">
										Post Title
									</TableHeadCell>
									<TableHeadCell className="sticky top-0 bg-white dark:bg-gray-900 z-20">
										Category
									</TableHeadCell>
									<TableHeadCell className="sticky top-0 bg-white dark:bg-gray-900 z-20">
										Delete
									</TableHeadCell>
									<TableHeadCell className="sticky top-0 bg-white dark:bg-gray-900 z-20">
										Edit
									</TableHeadCell>
								</TableHead>

								<TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
									{userPosts.map((post) => (
										<TableRow
											key={post._id}
											className="bg-white dark:bg-gray-800"
										>
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
												<span className="font-medium text-red-500 cursor-pointer hover:underline">
													Delete
												</span>
											</TableCell>
											<TableCell>
												<Link
													className="text-teal-500 hover:underline"
													to={`/post/${post._id}`}
												>
													Edit
												</Link>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>

					{showMore && (
						<button
							className="mx-auto w-full self-center text-md py-7 mt-3 sm:mt-3 text-gray-900 dark:text-white cursor-pointer hover:underline"
							onClick={handleShowMore}
						>
							Load More
						</button>
					)}
				</>
			) : (
				<p>No Posts Found</p>
			)}
		</div>
	);
};

export default DashPosts;
