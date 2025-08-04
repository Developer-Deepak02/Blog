import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const createPost = () => {
	return (
		<div className="p-3 max-w-3xl mx-auto min-h-screen ">
			<h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
			<form action="" className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 sm:flex-row items-center ">
					<TextInput
						type="text"
						placeholder="Title"
						required
						id="title"
						className="w-full sm:flex-1 h-12"
					/>
					<Select className="w-full sm:w-48 h-12">
						<option value="uncategorized">Select Category</option>
						<option value="javscript">JavaScript</option>
						<option value="reactjs">reactjs</option>
						<option value="nextjs">nextjs</option>
					</Select>
				</div>
				<div className="flex flex-col gap-4 sm:flex-row items-center">
					<FileInput
						className="w-full sm:flex-1 h-12"
						type="file"
						accept="image/*"
					/>
					<Button type="button" outline className="w-full sm:w-48 h-12">
						Upload Image
					</Button>
				</div>
				<ReactQuill
					theme="snow"
					placeholder="Write your content here."
					className="h-75 mb-12"
					required
				/>
				<Button
					type="submit"
					className="mt-4 sm:mt-0 cursor-pointer bg-blue-600"
				>
					Publish
				</Button>
			</form>
		</div>
	);
};

export default createPost;
