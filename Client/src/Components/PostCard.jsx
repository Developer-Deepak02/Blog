import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({post}) => {
	return (
		<div className="group relative w-full border border-gray-500 h-[23rem] overflow-hidden rounded-lg md:w[8rem] lg:w-[18rem]  transition-all mx-auto dark:bg-gray-600 dark:text-white">
			<Link to={`/post/${post.slug}`}>
				<img
					src={post.image}
					alt="post cover"
					className="h-[14rem] w-full  object-cover transition-all duration-300 z-20"
				/>
			</Link>
			<div className="p-3 flex flex-col gap-2">
				<p className="text-lg font-semibold line-clamp-2 truncate">{post.title}</p>
				<span className="italic text-sm">{post.category}</span>
				<Link
					to={`/post/${post.slug}`}
					className=" bg-green-500 text-white rounded-md hover:bg-green-600 transition cursor-pointer  duration-300 text-center py-2   m-2 "
				>
					Read article
				</Link>
			</div>
		</div>
	);
};

export default PostCard;
