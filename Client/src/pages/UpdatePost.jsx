import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { supabase } from "../utils/supabaseClient";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline"; // Heroicons

export default function UpdatePost() {
	const [formData, setFormData] = useState({});
	const [publishError, setPublishError] = useState(null);
	const [imageFile, setImageFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const { postId } = useParams();
	const navigate = useNavigate();
	const currentUser = useSelector((state) => state.user?.currentUser);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const res = await fetch(`/api/post/getposts?postId=${postId}`);
				const data = await res.json();
				if (!res.ok) {
					setPublishError(data.message);
					return;
				}
				setFormData(data.posts[0]);
				setPublishError(null);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchPost();
	}, [postId]);

	const handleImageUpload = async () => {
		if (!imageFile) return alert("Please select an image to upload.");

		try {
			setUploading(true);
			const fileName = `${Date.now()}-${imageFile.name}`;
			const { data, error } = await supabase.storage
				.from("minddraft-blog-images")
				.upload(fileName, imageFile);

			if (error) throw error;

			const {
				data: { publicUrl },
			} = supabase.storage.from("minddraft-blog-images").getPublicUrl(fileName);

			setFormData((prev) => ({ ...prev, image: publicUrl }));
			alert("Image uploaded successfully!");
		} catch (err) {
			console.error("Image upload failed:", err.message);
			alert("Image upload failed.");
		} finally {
			setUploading(false);
		}
	};

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
			setPublishError(null);
			navigate(`/post/${data.slug}`);
		} catch (error) {
			setPublishError("Something went wrong");
		}
	};

	return (
		<div className="p-3 max-w-3xl mx-auto min-h-screen bg-gray-50 dark:bg-gray-800 dark:text-white">
			<h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				{/* Title & Category */}
				<div className="flex flex-col gap-4 sm:flex-row items-center">
					<TextInput
						type="text"
						placeholder="Title"
						required
						id="title"
						className="w-full sm:flex-1 h-10"
						value={formData.title || ""}
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
					/>
					<Select
						className="w-full sm:w-48 h-10 cursor-pointer"
						value={formData.category || "uncategorized"}
						onChange={(e) =>
							setFormData({ ...formData, category: e.target.value })
						}
					>
						<option value="uncategorized">Select a category</option>
						<option value="javascript">JavaScript</option>
						<option value="reactjs">React.js</option>
						<option value="nextjs">Next.js</option>
					</Select>
				</div>

				{/* File input + Upload button */}
				<div className="flex flex-col gap-4 sm:flex-row items-center">
					<FileInput
						className="w-full sm:flex-1 h-10 cursor-pointer"
						type="file"
						accept="image/*"
						onChange={(e) => setImageFile(e.target.files[0])}
						disabled={uploading}
					/>
					<Button
						type="button"
						className="w-full sm:w-48 h-10 flex items-center justify-center gap-2"
						outline
						color="gray"
						onClick={handleImageUpload}
						disabled={uploading}
					>
						<CloudArrowUpIcon className="h-5 w-5" />
						{uploading ? "Uploading..." : "Upload"}
					</Button>
				</div>

				{/* Current image preview */}
				{formData.image && (
					<img
						src={formData.image}
						alt="Uploaded preview"
						className="w-full h-72 object-cover rounded-md"
					/>
				)}

				{/* Rich text editor */}
				<ReactQuill
					theme="snow"
					value={formData.content || ""}
					placeholder="Write something..."
					className="h-72 mb-12"
					required
					onChange={(value) => setFormData({ ...formData, content: value })}
				/>

				{/* Submit */}
				<Button type="submit" className="mt-4 cursor-pointer bg-blue-600">
					Update Post
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
