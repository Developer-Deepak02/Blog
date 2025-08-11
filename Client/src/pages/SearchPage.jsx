import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

//  Strip HTML tags using regex
const stripHtmlTags = (html) => {
	return html?.replace(/<[^>]*>/g, "") || "";
};

const SearchPage = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const limit = 6; // posts per page

	const location = useLocation();
	const navigate = useNavigate();

	const queryParams = new URLSearchParams(location.search);
	const searchTerm = queryParams.get("q") || "";

	// Reset page to 1 when searchTerm changes
	useEffect(() => {
		setPage(1);
	}, [searchTerm]);

	useEffect(() => {
		if (!searchTerm) return;

		const fetchPosts = async () => {
			try {
				setLoading(true);
				setError("");

				const res = await fetch(
					`/api/post/search?q=${encodeURIComponent(
						searchTerm
					)}&page=${page}&limit=${limit}`
				);
				const data = await res.json();

				if (!res.ok) throw new Error(data.message || "Something went wrong");

				setPosts(data.posts || []);
				setTotalPages(data.totalPages || 1);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [searchTerm, page]);

	// Handle page change
	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setPage(newPage);
			navigate(`/search?q=${encodeURIComponent(searchTerm)}&page=${newPage}`);
		}
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<h1 className="text-2xl font-semibold mb-6">
				Search Results for: <span className="text-blue-600">{searchTerm}</span>
			</h1>

			{loading && (
				<div className="text-center py-10 text-gray-500">Loading...</div>
			)}

			{error && !loading && (
				<div className="text-center py-10 text-red-500">{error}</div>
			)}

			{!loading && !error && posts.length === 0 && (
				<div className="text-center py-10 text-gray-500">No results found.</div>
			)}

			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<Link
						to={`/post/${post.slug}`}
						key={post._id}
						className="bg-white dark:bg-gray-700 shadow-xs border border-gray-200 dark:border-gray-600  rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-all"
					>
						{post.image && (
							<img
								src={post.image}
								alt={post.title}
								className="w-full h-48 object-cover"
							/>
						)}
						<div className="p-5 flex flex-col flex-1">
							<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
								{post.title}
							</h2>
							<p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-3 flex-grow">
								{stripHtmlTags(post.excerpt || post.content)?.slice(0, 100) +
									"..."}
							</p>
							<p className="flex justify-center  mt-4 text-white font-medium text-center p-2 rounded-md  bg-green-500 hover:bg-green-700 transition cursor-pointer duration-300">
								<div className="flex items-center gap-2">
									Read Full Article
									<FaArrowRight />
								</div>
							</p>
						</div>
					</Link>
				))}
			</div>

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-4 mt-8">
					<button
						disabled={page === 1}
						onClick={() => handlePageChange(page - 1)}
						className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
					>
						Previous
					</button>
					<span className="font-medium">
						Page {page} of {totalPages}
					</span>
					<button
						disabled={page === totalPages}
						onClick={() => handlePageChange(page + 1)}
						className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default SearchPage;
