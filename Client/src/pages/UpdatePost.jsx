import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

export default function UpdatePost() {
	const [formData, setFormData] = useState({});
	const [publishError, setPublishError] = useState(null);
	const { postId } = useParams();

	const navigate = useNavigate();
const currentUser = useSelector((state) => state.user?.currentUser);

	useEffect(() => {
		try {
			const fetchPost = async () => {
				const res = await fetch(`/api/post/getposts?postId=${postId}`);
				const data = await res.json();
				if (!res.ok) {
					console.log(data.message);
					setPublishError(data.message);
					return;
				}
				if (res.ok) {
					setPublishError(null);
					setFormData(data.posts[0]);
				}
			};

			fetchPost();
		} catch (error) {
			console.log(error.message);
		}
	}, [postId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				`/api/post/updatepost/${postId}/${currentUser._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);
			const data = await res.json();
			if (!res.ok) {
				setPublishError(data.message);
				return;
			}

			if (res.ok) {
				setPublishError(null);
				navigate(`/post/${data.slug}`);
			}
		} catch (error) {
			setPublishError("Something went wrong");
		}
	};

	return (
		<div className="p-3 max-w-3xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
			<h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4 sm:flex-row items-center ">
					<TextInput
						type="text"
						placeholder="Title"
						required
						id="title"
						className="w-full sm:flex-1 h-10"
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
						value={formData.title}
					/>
					<Select
						className="w-full sm:w-48 h-10 cursor-pointer"
						onChange={(e) =>
							setFormData({ ...formData, category: e.target.value })
						}
						value={formData.category}
					>
						<option value="uncategorized">Select a category</option>
						<option value="javascript">JavaScript</option>
						<option value="reactjs">React.js</option>
						<option value="nextjs">Next.js</option>
					</Select>
				</div>
				<div className="flex flex-col gap-4 sm:flex-row items-center">
					<FileInput
						className="w-full sm:flex-1 h-10 cursor-pointer"
						type="file"
						accept="image/*"
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<Button
						type="button"
						size="sm"
						outline
						className="w-full sm:w-48 h-10 cursor-pointer"
					>
						Upload Image
					</Button>
				</div>

				{formData.image && (
					<img
						src={formData.image}
						alt="upload"
						className="w-full h-72 object-cover"
					/>
				)}
				<ReactQuill
					theme="snow"
					value={formData.content}
					placeholder="Write something..."
					className="h-72 mb-12"
					required
					onChange={(value) => {
						setFormData({ ...formData, content: value });
					}}
				/>
				<Button
					type="submit"
					className="mt-4 sm:mt-0 cursor-pointer bg-blue-600"
				>
					Update post
				</Button>
				{publishError && (
					<Alert className="mt-5" color="failure">
						{publishError}
					</Alert>
				)}
			</form>
		</div>
	);
}
