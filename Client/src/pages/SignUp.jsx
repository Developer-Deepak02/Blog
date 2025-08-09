import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

const SignUp = () => {
	// Handle input change
	const [formData, setFormData] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// logic to send formData to your backend
		if (!formData.username || !formData.email || !formData.password) {
			return setErrorMessage("All fields are required");
		}
		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				return setErrorMessage(data.message);
			}
			setLoading(false);
			if (res.ok) {
				navigate("/signin");
			}
		} catch (error) {
			setErrorMessage(error.message);
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 px-4">
			<div className="flex p-6  sm:p-8 md:p-12 lg:p-16 max-w-4xl w-full flex-col md:flex-row md:items-center gap-12 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-2xs rounded-md mt-8 sm:mt-0 mb-8 sm:mb-0">
				{/* Left Section */}
				<div className="md:w-1/2 flex flex-col justify-center gap-6 text-center md:text-left items-center md:items-start">
					<Link
						to="/"
						className="font-bold text-gray-700 dark:text-white text-3xl "
					>
						<span className="px-2 py-1 border-2 border-blue-500 mr-2 rounded-lg text-4xl text-blue-500 dark:text-blue-400">
							Mind
						</span>
						Draft
					</Link>

					<p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
						Turn your Thoughts into
						<span className="text-blue-500 font-bold border-b-2 border-blue-500 ml-2">
							Reality
						</span>
					</p>

					<p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-md text-justify sm:text-left">
						Your mind is full of ideas — thoughts worth capturing, stories
						waiting to be told. Let{" "}
						<span className="text-blue-600 dark:text-blue-500 font-semibold italic">
							MindDraft
						</span>{" "}
						help you turn those sparks of inspiration into real, meaningful
						content — beautifully organized, effortlessly shared, and ready to
						make an impact.
					</p>
				</div>

				{/* Right Section */}
				<div className="md:w-1/2 dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
					<h2 className="text-2xl font-semibold dark:text-gray-300 text-gray-700">
						Create your account
					</h2>
					<form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
						<div>
							<Label htmlFor="username" className="text-gray-600">
								Username
							</Label>
							<TextInput
								id="username"
								type="text"
								required
								placeholder="Enter your username"
								onChange={handleChange}
							/>
						</div>

						<div>
							<Label htmlFor="email" className="text-gray-600">
								Email
							</Label>
							<TextInput
								id="email"
								type="email"
								required
								placeholder="Enter your email"
								onChange={handleChange}
							/>
						</div>

						<div>
							<Label htmlFor="password" className="text-gray-600">
								Password
							</Label>
							<TextInput
								id="password"
								type="password"
								required
								placeholder="Enter your password"
								onChange={handleChange}
							/>
						</div>

						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-blue-500 hover:bg-blue-800 text-white transition duration-200 cursor-pointer"
						>
							{loading ? (
								<>
									<Spinner size="sm" />
									<span className="pl-3">Loading</span>
								</>
							) : (
								"Sign Up"
							)}
						</Button>

						<OAuth />
					</form>

					<div className="flex gap-2 text-sm mt-4 text-gray-500 dark:text-gray-400">
						<span>Have an account?</span>
						<Link
							to="/signin"
							className="text-blue-500 hover:text-blue-700 hover:underline"
						>
							Sign In
						</Link>
					</div>

					{errorMessage && (
						<Alert color="failure" className="mt-5">
							{errorMessage}
						</Alert>
					)}
				</div>
			</div>
		</div>
	);
};

export default SignUp;
