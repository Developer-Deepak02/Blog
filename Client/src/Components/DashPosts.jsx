import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	Modal,
	ModalBody,
	ModalHeader,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
	Button,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { tailwindScrollbar } from "tailwind-scrollbar";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPosts = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [userPosts, setUserPosts] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [postIdToDelete, setPostIdToDelete] = useState("");
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

	// delete post

	const handleDeletePost = async () => {
		setShowModal(false);
		try {
			const res = await fetch(
				`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();
			if (!res.ok) {
				console.log(data.message);
			} else {
				setUserPosts((prev) =>
					prev.filter((post) => post._id !== postIdToDelete)
				);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="mx-auto mt-9 lg:mt-1  p-3">
			{currentUser.isAdmin && userPosts.length > 0 ? (
				<>
					{/* Horizontal & vertical scroll container */}
					<div className="relative max-w-full overflow-x-auto max-h-[80vh] md:h-[78vh] lg:max-h-[90vh] rounded-md border border-gray-200 dark:border-gray-700 ">
						<div className="w-[85vw] md:w-[68vw] lg:w-[74vw] mx-auto overflow-y-auto ">
							<Table>
								<TableHead className="sticky top-0 z-20 bg-white dark:bg-gray-900">
									<TableHeadCell className="sticky top-0 bg-white dark:bg-gray-900 z-20 ">
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
											<TableCell className="max-w-[18.75rem] sm:max-w-[10rem] md:max-w-[12.5rem] lg:max-w-[15rem]">
												<Link
													className="block truncate whitespace-nowrap font-medium text-gray-900 dark:text-white"
													to={`/post/${post.slug}`}
												>
													{post.title}
												</Link>
											</TableCell>
											<TableCell>{post.category}</TableCell>
											<TableCell>
												<span
													className="font-medium text-red-500 cursor-pointer hover:underline"
													onClick={() => {
														setShowModal(true);
														setPostIdToDelete(post._id);
													}}
												>
													Delete
												</span>
											</TableCell>
											<TableCell>
												<Link
													className="text-teal-500 hover:underline"
													to={`/update-post/${post._id}`}
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
							Are you sure you want to delete this post ?
						</h3>
						<div className="flex justify-center gap-6">
							<Button
								// color="failure"
								className="bg-red-700 hover:bg-red-800 text-white"
								onClick={handleDeletePost}
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

export default DashPosts;
