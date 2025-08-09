import React from "react";
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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashComments() {
	const { currentUser } = useSelector((state) => state.user);
	const [comments, setComments] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [commentIdToDelete, setCommentIdToDelete] = useState("");
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const res = await fetch(`/api/comment/getcomments`);
				const data = await res.json();
				if (res.ok) {
					setComments(data.comments);
					if (data.comments.length < 9) {
						setShowMore(false);
					}
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		if (currentUser.isAdmin) {
			fetchComments();
		}
	}, [currentUser._id]);

	const handleShowMore = async () => {
		const startIndex = comments.length;
		try {
			const res = await fetch(
				`/api/comment/getcomments?startIndex=${startIndex}`
			);
			const data = await res.json();
			if (res.ok) {
				setComments((prev) => [...prev, ...data.comments]);
				if (data.comments.length < 9) {
					setShowMore(false);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleDeleteComment = async () => {
		setShowModal(false);
		try {
			const res = await fetch(
				`/api/comment/deleteComment/${commentIdToDelete}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();
			if (res.ok) {
				setComments((prev) =>
					prev.filter((comment) => comment._id !== commentIdToDelete)
				);
				setShowModal(false);
			} else {
				console.log(data.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

  console.log(comments);

	return (
		<div className="table-auto overflow-x-scroll md:mx-auto  scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 w-[85vw] md:w-[68vw] lg:w-[78vw] mx-auto">
			{currentUser.isAdmin && comments.length > 0 ? (
				<>
					{/* Horizontal & vertical scroll container */}
					<div className="relative max-w-full overflow-x-auto max-h-[80vh] md:h-[78vh] lg:max-h-[90vh] rounded-md border border-gray-200 dark:border-gray-700 w-[85vw] md:w-[68vw] lg:w-[72vw] mx-auto">
						<div className="mx-auto overflow-y-auto ">
							<Table>
								<TableHead className="sticky top-0 z-20 bg-white dark:bg-gray-900">
									<TableHeadCell>Date Updated</TableHeadCell>
									<TableHeadCell>Comment content</TableHeadCell>
									<TableHeadCell>Number of likes</TableHeadCell>
									<TableHeadCell>PostId</TableHeadCell>
									<TableHeadCell>UserId</TableHeadCell>
									<TableHeadCell>Delete</TableHeadCell>
								</TableHead>

								<TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
									{comments.map((comment) => (
										<TableRow
											key={comment._id}
											className="bg-white dark:bg-gray-800"
										>
											<TableCell>
												{new Date(comment.updatedAt).toLocaleDateString()}
											</TableCell>
											<TableCell className="max-w-[18.75rem] sm:max-w-[10rem] md:max-w-[12.5rem] lg:max-w-[15rem]">
												{comment.content}
											</TableCell>
											<TableCell>{comment.numberOfLikes}</TableCell>
											<TableCell>{comment.postId}</TableCell>
											<TableCell>{comment.userId}</TableCell>
											<TableCell>
												<span
													onClick={() => {
														setShowModal(true);
														setCommentIdToDelete(comment._id);
													}}
													className="font-medium text-red-500 hover:underline cursor-pointer"
												>
													Delete
												</span>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
					{showMore && (
						<button
							onClick={handleShowMore}
							className="mx-auto w-full self-center text-md py-7 mt-3 sm:mt-3 text-gray-900 dark:text-white cursor-pointer hover:underline"
						>
							Show more
						</button>
					)}
				</>
			) : (
				<p>You have no comments yet!</p>
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
							Are you sure you want to delete this comment?
						</h3>
						<div className="flex justify-center gap-4">
							<Button
								color="red"
								onClick={handleDeleteComment}
								className="cursor-pointer"
							>
								Yes, I'm sure
							</Button>
							<Button
								color="gray"
								onClick={() => setShowModal(false)}
								className="cursor-pointer"
							>
								No, cancel
							</Button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}
