import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { use } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const createPost = () => {
	const [formData, setFormData] = useState({});
	const [publisherror, setPublishError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
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
			if (res.ok) {
				setPublishError(null);
				navigate(`/post/${data.slug}`);
			}
		} catch (error) {
			setPublishError("something went wrong");
		}
	};
	return (
		<div className="p-3 max-w-3xl mx-auto min-h-screen ">
			<h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
			<form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
					/>
					<Select
						className="w-full sm:w-48 h-10"
						onChange={(e) =>
							setFormData({ ...formData, category: e.target.value })
						}
					>
						<option value="uncategorized">Select Category</option>
						<option value="javscript">JavaScript</option>
						<option value="reactjs">reactjs</option>
						<option value="nextjs">nextjs</option>
					</Select>
				</div>
				<div className="flex flex-col gap-4 sm:flex-row items-center">
					<FileInput
						className="w-full sm:flex-1 h-10"
						type="file"
						accept="image/*"
					/>
					<Button type="button" outline className="w-full sm:w-48 h-10">
						Upload Image
					</Button>
				</div>
				<ReactQuill
					theme="snow"
					placeholder="Write your content here."
					className="h-75 mb-12"
					required
					onChange={(e) => setFormData({ ...formData, content: e })}
				/>
				<Button
					type="submit"
					className="mt-4 sm:mt-0 cursor-pointer bg-blue-600"
				>
					Publish
				</Button>
				{
					publisherror && <Alert color="failure" className="mt-4">{publisherror}</Alert>
				}
			</form>
		</div>
	);
};

export default createPost;
