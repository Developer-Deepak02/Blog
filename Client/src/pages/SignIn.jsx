import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../Components/OAuth";

const SignIn = () => {
	// Handle input change
	const [formData, setFormData] = useState({});
	const { loading, error: errorMessage } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.email || !formData.password) {
			return dispatch(signInFailure("Please fill all fields"));
		}

		try {
			dispatch(signInStart());
			const res = await fetch("/api/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok || data.success === false) {
				return dispatch(signInFailure(data.message || "Login failed"));
			}

			dispatch(signInSuccess(data));
			navigate("/");
		} catch (error) {
			dispatch(signInFailure("Something went wrong"));
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
			<div className="flex flex-col md:flex-row max-w-5xl w-full gap-12 border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-2xl rounded-2xl p-6 md:p-12 lg:p-16">
				{/* Left Section */}
				<div className="md:w-1/2 flex flex-col justify-center gap-6">
					<Link
						to="/"
						className="font-bold dark:text-white text-3xl text-gray-700"
					>
						<span className="px-2 py-1 border-2 border-blue-500 mr-2 rounded-lg text-4xl text-blue-500 dark:text-blue-400">
							Mind
						</span>
						Draft
					</Link>

					<p className="text-xl font-semibold text-gray-700 dark:text-gray-400">
						Turn your Thoughts into
						<span className="text-blue-500 font-bold border-b-2 border-blue-500 ml-2">
							Reality
						</span>
					</p>

					<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
						Your mind is full of ideas — thoughts worth capturing, stories
						waiting to be told. Let{" "}
						<span className="text-blue-600 dark:text-blue-500 font-semibold italic ">
							MindDraft
						</span>{" "}
						help you transform inspiration into real, meaningful content —
						beautifully organized, effortlessly shared, and ready to make an
						impact.
					</p>
				</div>

				{/* Right Section */}
				<div className="md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
					<h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
						Login to your account
					</h2>

					<form className="space-y-4" onSubmit={handleSubmit}>
						<div>
							<Label
								htmlFor="email"
								className="text-gray-600 dark:text-gray-300"
							>
								Email
							</Label>
							<TextInput
								id="email"
								type="email"
								placeholder="Enter your email"
								onChange={handleChange}
							/>
						</div>

						<div>
							<Label
								htmlFor="password"
								className="text-gray-600 dark:text-gray-300"
							>
								Password
							</Label>
							<TextInput
								id="password"
								type="password"
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
								"Sign In"
							)}
						</Button>

						<OAuth />
					</form>

					<div className="flex gap-2 text-sm mt-4 text-gray-500 dark:text-gray-400">
						<span>Don't have an account?</span>
						<Link
							to="/signup"
							className="text-blue-500 hover:text-blue-700 hover:underline"
						>
							Sign Up
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

export default SignIn;
