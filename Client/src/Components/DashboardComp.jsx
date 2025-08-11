import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	HiAnnotation,
	HiArrowNarrowUp,
	HiDocumentText,
	HiOutlineUserGroup,
} from "react-icons/hi";
import {
	Table,
	TableHead,
	TableHeadCell,
	TableBody,
	TableRow,
	TableCell,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export default function DashboardComp() {
	const [comments, setComments] = useState([]);
	const [posts, setPosts] = useState([]);
	const [totalPosts, setTotalPosts] = useState(0);
	const [totalComments, setTotalComments] = useState(0);
	const [lastMonthPosts, setLastMonthPosts] = useState(0);
	const [lastMonthComments, setLastMonthComments] = useState(0);
	const { currentUser } = useSelector((state) => state.user);
	useEffect(() => {

		const fetchPosts = async () => {
			try {
				const res = await fetch("/api/post/getposts?limit=5");
				const data = await res.json();
				if (res.ok) {
					setPosts(data.posts);
					setTotalPosts(data.totalPosts);
					setLastMonthPosts(data.lastMonthPosts);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		const fetchComments = async () => {
			try {
				const res = await fetch("/api/comment/getcomments?limit=5");
				const data = await res.json();
				if (res.ok) {
					setComments(data.comments);
					setTotalComments(data.totalComments);
					setLastMonthComments(data.lastMonthComments);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		if (currentUser.isAdmin) {
		
			fetchPosts();
			fetchComments();
		}
	}, [currentUser]);
	return (
		<div className="mx-w-lg md:max-w-[60vw] lg:max-w-[70vw] md:mx-auto">
			<div className="flex-wrap flex gap-4 justify-center lg:w-full lg:justify-between">
				<div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full lg:flex-col lg:flex-1 rounded-md shadow-md bg-gray-50">
					<div className="flex justify-between">
						<div className="">
							<h3 className="text-gray-500 text-md uppercase">
								Total Comments
							</h3>
							<p className="text-2xl">{totalComments}</p>
						</div>
						<HiAnnotation className="bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg" />
					</div>
					<div className="flex  gap-2 text-sm">
						<span className="text-green-500 flex items-center">
							<HiArrowNarrowUp />
							{lastMonthComments}
						</span>
						<div className="text-gray-500">Last month</div>
					</div>
				</div>
				<div className="flex flex-col p-3 bg-gray-50 dark:bg-slate-800 gap-4 md:w-72 w-full lg:flex-1  rounded-md shadow-md">
					<div className="flex justify-between">
						<div className="">
							<h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
							<p className="text-2xl">{totalPosts}</p>
						</div>
						<HiDocumentText className="bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg" />
					</div>
					<div className="flex  gap-2 text-sm">
						<span className="text-green-500 flex items-center">
							<HiArrowNarrowUp />
							{lastMonthPosts}
						</span>
						<div className="text-gray-500">Last month</div>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap gap-4 lg:gap-2 py-3 mx-auto justify-center lg:w-full lg:justify-between ">
				<div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 lg:w-[23vw]">
					<div className="flex justify-between  p-3 text-sm font-semibold">
						<h1 className="text-center p-2">Recent comments</h1>
						<Button outline className="cursor-pointer">
							<Link to={"/dashboard?tab=comments"}>See all</Link>
						</Button>
					</div>
					<Table hoverable>
						<TableHead>
							<TableHeadCell>Comment content</TableHeadCell>
							<TableHeadCell>Likes</TableHeadCell>
						</TableHead>
						{comments &&
							comments.map((comment) => (
								<TableBody key={comment._id} className="divide-y">
									<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
										<TableCell className="w-96">
											<p className="line-clamp-2 truncate">{comment.content}</p>
										</TableCell>
										<TableCell>{comment.numberOfLikes}</TableCell>
									</TableRow>
								</TableBody>
							))}
					</Table>
				</div>
				<div className="flex flex-col w-full md:w-auto lg:w-[42vw] shadow-md p-2 rounded-md dark:bg-gray-800 overflow-scroll">
					<div className="flex justify-between  p-3 text-sm font-semibold">
						<h1 className="text-center p-2">Recent posts</h1>
						<Button outline>
							<Link to={"/dashboard?tab=posts"}>See all</Link>
						</Button>
					</div>
					<Table hoverable>
						<TableHead>
							<TableHeadCell>Post image</TableHeadCell>
							<TableHeadCell>Post Title</TableHeadCell>
							<TableHeadCell>Category</TableHeadCell>
						</TableHead>
						{posts &&
							posts.map((post) => (
								<TableBody key={post._id} className="divide-y">
									<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
										<TableCell>
											<img
												src={post.image}
												alt="user"
												className="w-14 h-10 rounded-md bg-gray-500"
											/>
										</TableCell>
										<TableCell className="w-40 md:w-96  truncate line-clamp-2">
											{post.title}
										</TableCell>
										<TableCell className="w-5">{post.category}</TableCell>
									</TableRow>
								</TableBody>
							))}
					</Table>
				</div>
			</div>
		</div>
	);
}
