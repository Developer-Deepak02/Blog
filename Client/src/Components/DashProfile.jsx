import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
import { set } from "mongoose";

const DashProfile = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [formData, setFormData] = useState({});
	const dispatch = useDispatch();
	const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
	const [updateUserError, setupdateUserError] = useState(null);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setUpdateUserSuccess(null);
		setupdateUserError(null);
		if (Object.keys(formData).length === 0) {
			setupdateUserError("No changes made to profile.");
			return;
		}
		try {
			dispatch(updateStart());
			const res = await fetch(`/api/users/update/${currentUser._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (!res.ok) {
				dispatch(updateFailure(data.message));
				setupdateUserError(data.message);
			} else {
				dispatch(updateSuccess(data));
				setUpdateUserSuccess("user updated successfully");
			}
		} catch (error) {
			dispatch(updateFailure(error.message));
			setupdateUserError(error.message);
		}
	};
	return (
		<div className="mx-w-lg mx-auto p-3 w-full">
			<h1 className="my-7 text-center font-semibold text-3xl text-white">
				Profile
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="w-32 h-32 self-center cursor-pointer mb-4 shadow-2xl overflow-hidden rounded-full">
					<img
						src={currentUser.profilePicture}
						alt="user"
						className="rounded-full w-full h-full border-8 border-gray-400 object-cover"
					/>
				</div>
				<div className=" flex flex-col gap-4 mx-auto lg:w-1/2 md:w-full sm:w-full">
					<TextInput
						type="text"
						id="username"
						placeholder="Username"
						defaultValue={currentUser.username}
						onChange={handleChange}
					/>
					<TextInput
						type="email"
						id="email"
						placeholder="email"
						defaultValue={currentUser.email}
						onChange={handleChange}
					/>
					<TextInput
						type="password"
						id="password"
						placeholder="Password"
						onChange={handleChange}
					/>
					<Button type="submit">Update</Button>
					<div className="text-red-500 mt-4 flex justify-between">
						<span className="cursor-pointer">Delete account</span>
						<span className="cursor-pointer">Sign out</span>
					</div>
					{updateUserSuccess && (
						<Alert className="mt-5" color="success">
							{updateUserSuccess}
						</Alert>
					)}
					{updateUserError && (
						<Alert className="mt-5" color="failure">
							{updateUserError}
						</Alert>
					)}
				</div>
			</form>
		</div>
	);
};

export default DashProfile;
