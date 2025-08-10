import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePostCard = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Pagination states
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 9; // posts per page

	const fetchPosts = async (pageNum) => {
		try {
			setLoading(true);
			setError(null);

			const res = await fetch(
				`/api/post/getposts?page=${pageNum}&limit=${limit}&order=desc`
			);
			const data = await res.json();

			if (!res.ok) throw new Error(data.message || "Failed to load posts");

			setPosts(data.posts);
			setTotalPages(data.totalPages || 1);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts(page);
	}, [page]);

	// Create pagination range with ellipsis
	const getPaginationRange = () => {
		const totalNumbers = 5; // max visible numbers (excluding Prev/Next)
		const totalBlocks = totalNumbers + 2; // incl first & last

		if (totalPages > totalBlocks) {
			const startPage = Math.max(2, page - 1);
			const endPage = Math.min(totalPages - 1, page + 1);
			let pages = [];

			// Always show first page
			pages.push(1);

			// Ellipsis before middle pages
			if (startPage > 2) {
				pages.push("...");
			}

			// Middle pages
			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			// Ellipsis after middle pages
			if (endPage < totalPages - 1) {
				pages.push("...");
			}

			// Always show last page
			pages.push(totalPages);

			return pages;
		}

		// If small number of pages
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	};

	const handlePageChange = (newPage) => {
		setPage(newPage);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="w-full px-4 py-12">
			{/* Heading */}
			<div className="text-center mb-10">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
					The Latest from Our Blog
				</h1>
				<p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
					Stay updated with fresh insights, tips, and stories from our
					community.
				</p>
			</div>

			{/* Error State */}
			{error && <div className="text-center text-red-500 mb-6">{error}</div>}

			{/* No posts */}
			{!loading && posts.length === 0 && !error && (
				<p className="text-center text-gray-500 dark:text-gray-400">
					No posts found.
				</p>
			)}

			{/* Grid Layout */}
			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<div
						key={post._id}
						className="bg-white dark:bg-gray-600 shadow-md rounded-lg overflow-hidden flex flex-col"
					>
						<img
							src={post.image || "/images/blog/default.jpg"}
							alt={post.title}
							className="h-48 w-full object-cover"
							onError={(e) => {
								e.target.src = "/images/blog/default.jpg";
							}}
						/>
						<div className="p-5 flex flex-col flex-1">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
								{post.title}
							</h2>
							<p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-3 flex-grow">
								{post.content.replace(/<[^>]+>/g, "")}
							</p>
							<div className="mt-4 flex justify-center">
								<Link
									to={`/post/${post.slug}`}
									className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition cursor-pointer"
								>
									Read Full Article →
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<div className="flex flex-wrap justify-center mt-10 space-x-1">
					{/* Prev Button */}
					<button
						className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
						onClick={() => handlePageChange(Math.max(page - 1, 1))}
						disabled={page === 1}
					>
						Prev
					</button>

					{/* Page Numbers */}
					{getPaginationRange().map((p, i) => (
						<button
							key={i}
							className={`px-3 py-1 border rounded cursor-pointer ${
								page === p
									? "bg-gray-900 text-white border-gray-900 dark:bg-gray-300 dark:text-gray-800 dark:border-gray-300"
									: "bg-white text-gray-900 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
							}`}
							onClick={() => typeof p === "number" && handlePageChange(p)}
							disabled={p === "..."}
						>
							{p}
						</button>
					))}

					{/* Next Button */}
					<button
						className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
						onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
						disabled={page === totalPages}
					>
						Next
					</button>
				</div>
			)}

			{/* Loading Spinner */}
			{loading && (
				<div className="flex justify-center mt-6">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
				</div>
			)}
		</div>
	);
};

export default HomePostCard;
