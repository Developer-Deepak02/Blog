import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline"; 

const CreatePost = () => {
	const [formData, setFormData] = useState({});
	const [imageFile, setImageFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [publisherror, setPublishError] = useState(null);
	const navigate = useNavigate();

	const handleImageUpload = async () => {
		if (!imageFile) return alert("Please select an image before uploading.");

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
		} catch (error) {
			console.error("Upload failed:", error.message);
			alert("Image upload failed.");
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.image) {
			alert("Please upload an image before publishing.");
			return;
		}

		try {
			const res = await fetch("/api/post/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
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
			<h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				{/* Title and Category */}
				<div className="flex flex-col gap-4 sm:flex-row items-center">
					<TextInput
						type="text"
						placeholder="Title"
						required
						id="title"
						className="w-full sm:flex-1 h-10"
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
					/>
					<Select
						className="w-full sm:w-48 h-10"
						onChange={(e) =>
							setFormData({ ...formData, category: e.target.value })
						}
					>
						<option value="uncategorized">Select Category</option>
						<option value="Technology">Technology</option>
						<option value="LifeStyle">LifeStyle</option>
						<option value="News">News</option>
						<option value="International">International</option>
						<option value="Jobs">Jobs</option>
					</Select>
				</div>

				{/* File Upload + Upload Button */}
				<div className="flex flex-col gap-4 sm:flex-row items-center">
					<FileInput
						className="w-full sm:flex-1 h-10"
						type="file"
						accept="image/*"
						onChange={(e) => setImageFile(e.target.files[0])}
						disabled={uploading}
					/>
					<Button
						type="button"
						className="w-full sm:w-48 h-10 flex items-center justify-center gap-2"
						color="gray"
						outline
						onClick={handleImageUpload}
						disabled={uploading}
					>
						<CloudArrowUpIcon className="h-5 w-5" />
						{uploading ? "Uploading..." : "Upload"}
					</Button>
				</div>

				{/* Rich Text Editor */}
				<ReactQuill
					theme="snow"
					placeholder="Write your content here."
					className="h-75 mb-12 placeholder-white"
					required
					onChange={(e) => setFormData({ ...formData, content: e })}
				/>

				{/* Submit */}
				<Button
					type="submit"
					className="mt-4 sm:mt-0 cursor-pointer bg-blue-600"
					disabled={uploading}
				>
					{uploading ? "Uploading..." : "Publish"}
				</Button>

				{publisherror && (
					<Alert color="failure" className="mt-4">
						{publisherror}
					</Alert>
				)}
			</form>
		</div>
	);
};

export default CreatePost;
