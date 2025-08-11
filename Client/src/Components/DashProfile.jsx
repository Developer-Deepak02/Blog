import {
	Alert,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	TextInput,
	Toast,
	ToastToggle,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
	CloudArrowUpIcon,
	CheckCircleIcon,
	XCircleIcon,
	InformationCircleIcon,
	ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	updateStart,
	updateSuccess,
	updateFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	signoutSucess,
} from "../redux/userSlice";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

const DashProfile = () => {
	const { currentUser, error, loading } = useSelector((state) => state.user);
	const [formData, setFormData] = useState({});
	const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
	const [updateUserError, setUpdateUserError] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [toast, setToast] = useState(null);
	const fileInputRef = useRef();
	const dispatch = useDispatch();

	// Update text inputs
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	// Upload profile picture to Supabase
	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) {
			showToast("No file selected.", "error");

			return;
		}

		try {
			setUploading(true);

			const fileName = `${Date.now()}-${file.name}`;
			const { data, error } = await supabase.storage
				.from("minddraft-blog-images")
				.upload(fileName, file);

			if (error) {
				throw new Error(error.message);
			}

			const {
				data: { publicUrl },
			} = supabase.storage.from("minddraft-blog-images").getPublicUrl(fileName);

			// Update state
			setFormData((prev) => ({ ...prev, profilePicture: publicUrl }));

			showToast("Profile picture uploaded!", "success");
		} catch (err) {
			showToast("Upload failed: " + err.message, "error");
		} finally {
			setUploading(false);
		}
	};


	// Submit updated profile info
	const handleSubmit = async (e) => {
		e.preventDefault();
		setUpdateUserSuccess(null);
		setUpdateUserError(null);

		if (Object.keys(formData).length === 0) {
			setUpdateUserError("No changes made to profile.");
			return;
		}

		try {
			dispatch(updateStart());
			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json();

			if (!res.ok) {
				dispatch(updateFailure(data.message));
				// setUpdateUserError(data.message);
				showToast("Upload failed: " + data.message, "error");

			} else {
				dispatch(updateSuccess(data));
				// setUpdateUserSuccess("User updated successfully.");
				showToast("Profile updated!", "success");
			}
		} catch (error) {
			dispatch(updateFailure(error.message));
			// setUpdateUserError(error.message);
			showToast( err.message, "error");

		}
	};

	// Delete user account
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
			dispatch(deleteUserFailure(error.message));
		}
	};

	// Sign out
	const handleSignout = async () => {
		try {
			const res = await fetch("/api/user/signout", { method: "POST" });
			const data = await res.json();
			if (res.ok) {
				dispatch(signoutSucess());
			} else {
				console.log(data.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

const toastTimeoutRef = useRef(null);

const showToast = (message, type = "info", duration = 3000) => {
	if (toastTimeoutRef.current) {
		clearTimeout(toastTimeoutRef.current);
	}

	setToast({ message, type });

	toastTimeoutRef.current = setTimeout(() => {
		setToast(null);
		toastTimeoutRef.current = null;
	}, duration);
};


	return (
		<div className="mx-w-lg md:max-w-[60vw] lg:max-w-[70vw] mx-auto bg-gray-50 dark:bg-gray-800 justify-center items-center w-full relative">
			<h1 className="my-7 text-center font-semibold text-3xl text-gray-700 dark:text-gray-300">
				Profile
			</h1>

			{/* Profile picture with hover effect */}
			<div
				className="relative w-32 h-32 self-center mx-auto mb-4 rounded-full overflow-hidden group cursor-pointer"
				onClick={() => fileInputRef.current.click()}
			>
				<img
					src={formData.profilePicture || currentUser.profilePicture}
					alt="user"
					className="w-full h-full object-cover border-4 border-gray-300 rounded-full group-hover:blur-sm transition duration-200"
				/>
				<div className="absolute inset-0 flex items-center justify-center bg-gray-600 bg-opacity-10 opacity-0 group-hover:opacity-100 transition duration-300">
					<CloudArrowUpIcon className="h-6 w-6 text-white" />
				</div>
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					className="hidden"
					onChange={handleFileChange}
				/>
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 mx-auto lg:w-1/2 md:w-2/3 w-[80vw]">
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
						placeholder="Email"
						defaultValue={currentUser.email}
						onChange={handleChange}
					/>
					<TextInput
						type="password"
						id="password"
						placeholder="Password"
						onChange={handleChange}
					/>
					<Button type="submit" className="cursor-pointer" disabled={loading}>
						{loading ? "Updating..." : "Update"}
					</Button>

					{currentUser.isAdmin && (
						<Link to={"/create-post"}>
							<Button type="button" outline className="cursor-pointer w-full">
								Create a post
							</Button>
						</Link>
					)}

					{/* Danger Zone */}
					<div className="text-red-500 mt-4 flex justify-between">
						<span onClick={() => setShowModal(true)} className="cursor-pointer">
							Delete account
						</span>
						<span onClick={handleSignout} className="cursor-pointer">
							Sign out
						</span>
					</div>

					{/* Inline Alerts */}
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

			{/* Toast Notification */}
			{toast && (
				<div className="fixed top-16 right-5 z-50 animate-slide-in">
					<Toast
						className={`border-l-4 p-4 rounded shadow-md transition-all duration-300
        ${
					toast.type === "success"
						? "border-green-500 bg-green-50 text-green-700"
						: toast.type === "error"
						? "border-red-500 bg-red-50 text-red-700"
						: toast.type === "info"
						? "border-blue-500 bg-blue-50 text-blue-700"
						: toast.type === "warning"
						? "border-yellow-500 bg-yellow-50 text-yellow-700"
						: ""
				}
      `}
					>
						{/* Icons */}
						{toast.type === "success" && (
							<CheckCircleIcon className="h-6 w-6" />
						)}
						{toast.type === "error" && <XCircleIcon className="h-6 w-6" />}
						{toast.type === "info" && (
							<InformationCircleIcon className="h-6 w-6" />
						)}
						{toast.type === "warning" && (
							<ExclamationTriangleIcon className="h-6 w-6" />
						)}

						<div className="ml-3 text-sm font-medium">{toast.message}</div>
						<ToastToggle onDismiss={() => setToast(null)} />
					</Toast>
				</div>
			)}

			{/* Delete Modal */}
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
	);
};

export default DashProfile;
