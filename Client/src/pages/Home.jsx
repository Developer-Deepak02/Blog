import React, { useState, useEffect } from "react";
import HomePostCard from "../Components/HomePostCard";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const postsPerPage = 9; // same as your backend limit

	useEffect(() => {
		fetchPosts(currentPage);
	}, [currentPage]);

	const fetchPosts = async (page) => {
		try {
			const res = await fetch(
				`/api/post/getposts?page=${page}&limit=${postsPerPage}`
			);
			const data = await res.json();

			setPosts(data.posts);
			setTotalPages(data.totalPages); // Make sure backend returns totalPages
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	};

	return (
		<div className="max-w-6xl mx-auto p-4">
			<HomePostCard posts={posts} />

		</div>
	);
};

export default Home;
