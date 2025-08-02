import {
	Alert,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	TextInput,
} from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
	updateStart,
	updateSuccess,
	updateFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
} from "../redux/userSlice";
import { set } from "mongoose";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashProfile = () => {
	const { currentUser , error} = useSelector((state) => state.user);
	const [formData, setFormData] = useState({});
	const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
	const [updateUserError, setupdateUserError] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
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

	// handle Delete USer
	const handleDeleteUser = async () => {
		try {
			dispatch(deleteUserStart());
			const res = await fetch(`/api/user/delete/${currentUser._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) {
				dispatch(deleteUserFailure(data.message));
			} else {
				dispatch(deleteUserSuccess());
			}
		} catch (error) {
			dispatch.deleteUserFailure(error.message);
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
					<Button type="submit" className="cursor-pointer">
						Update
					</Button>
					<div className="text-red-500 mt-4 flex justify-between">
						<span onClick={() => setShowModal(true)} className="cursor-pointer">
							Delete account
						</span>
						<span className="cursor-pointer">Sign out</span>
					</div>
					{updateUserSuccess && (
						<Alert className="mt-5" color="success">
							{updateUserSuccess}
						</Alert>
					)}
					{error && (
						<Alert className="mt-5" color="failure">
							{updateUserError}
						</Alert>
					)}
					<Modal
						show={showModal}
						onClose={() => setShowModal(false)}
						popup
						size="md"
					>
						<ModalHeader />
						<ModalBody>
							<div className="text-center">
								<HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
								<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
									Are you sure you want to delete your account?
								</h3>
								<div className="flex justify-center gap-6">
									<Button
										// color="failure"
										className="bg-red-700 hover:bg-red-800 text-white"
										onClick={handleDeleteUser}
									>
										Yes, delete account
									</Button>
									<Button color={"gray"} onClick={() => setShowModal(false)}>
										No, cancel
									</Button>
								</div>
							</div>
						</ModalBody>
					</Modal>
				</div>
			</form>
		</div>
	);
};

export default DashProfile;
