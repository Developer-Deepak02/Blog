// src/pages/About.jsx
import React from "react";

const AboutComp = () => {
	return (
		<section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
			<div className="max-w-6xl mx-auto px-6 py-16">
				{/* Heading */}
				<h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
					About{" "}
					<span className="text-blue-600 dark:text-blue-400">Mind Draft</span>
				</h1>

				{/* Intro Text */}
				<p className="text-center text-lg max-w-3xl mx-auto mb-12 text-gray-600 dark:text-gray-300">
					Welcome to <strong>Mind Draft</strong>, a space where ideas take
					shape. We believe in the power of thoughtful content, insightful
					perspectives, and meaningful conversations that inspire creativity and
					action.
				</p>

				{/* Content Grid */}
				<div className="grid gap-12 md:grid-cols-2 items-center">
					{/* Image */}
					<div className="flex justify-center">
						<img
							src="../../public/about.jpg"
							alt="About Mind Draft"
							className="rounded-2xl shadow-lg w-full max-w-md object-cover h-100"
						/>
					</div>

					{/* Text Content */}
					<div>
						<h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
						<p className="mb-6 text-gray-600 dark:text-gray-300">
							Our mission is to create a community where ideas can be shared
							freely, discussed openly, and developed into impactful solutions.
							Whether it's tech, culture, or lifestyle, we aim to draft content
							that matters.
						</p>

						<h2 className="text-2xl font-semibold mb-4">Why We Exist</h2>
						<p className="text-gray-600 dark:text-gray-300">
							In an era of fast information, we strive to slow down and focus on
							quality over quantity. Mind Draft is built for thinkers, creators,
							and curious minds who value depth, clarity, and inspiration.
						</p>
					</div>
				</div>

				{/* Closing Statement */}
				<div className="mt-16 text-center">
					<h3 className="text-xl font-medium mb-4">
						Let’s turn ideas into reality.
					</h3>
					<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Every great creation starts with a draft. Mind Draft is here to help
						you start yours.
					</p>
				</div>
			</div>
		</section>
	);
};

export default AboutComp;
