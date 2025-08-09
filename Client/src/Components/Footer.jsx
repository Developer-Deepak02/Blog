import {
	Footer,
	FooterCopyright,
	FooterDivider,
	FooterIcon,
	FooterLink,
	FooterLinkGroup,
	FooterTitle,
} from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsTwitter, BsInstagram, BsGithub } from "react-icons/bs";

const FooterCompoment = () => {
	return (
		<Footer
			container
			className="w-full rounded-none border-t-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"
		>
			<div className="w-full px-4">
				<div className="grid md:grid-cols-2 gap-10">
					{/* Logo and Description */}
					<div className="flex flex-col gap-4">
						<Link
							to="/"
							className="text-xl font-bold whitespace-nowrap dark:text-gray-300 text-gray-700"
						>
							<span className="px-2 py-1 border-2 text-blue-500  border-blue-500 mr-2 rounded-lg text-2xl dark:text-blue-400 dark:border-blue-400">
								Mind
							</span>
							Draft
						</Link>

						<p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
							Turn your thoughts into
							<span className="text-blue-500 font-bold border-b-2 border-blue-500 ml-2 dark:border-blue-500 dark:text-blue-500">
								Reality
							</span>
						</p>

						<p className="text-gray-700 dark:text-gray-400 max-w-md text-sm sm:text-base">
							Your mind is full of ideas — stories waiting to be told. Let{" "}
							<span className="text-blue-600 dark:text-blue-500 font-semibold italic">
								MindDraft
							</span>{" "}
							help you turn sparks of inspiration into beautifully crafted
							content, ready to share with the world.
						</p>
					</div>

					{/* Footer Links */}
					<div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
						<div>
							<FooterTitle title="About" />
							<FooterLinkGroup col>
								<FooterLink
									href="https://www.google.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
								>
									Google
								</FooterLink>
								<FooterLink
									href="/about"
									className="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
								>
									About
								</FooterLink>
							</FooterLinkGroup>
						</div>

						<div>
							<FooterTitle title="Follow us" />
							<FooterLinkGroup col>
								<FooterLink
									href="https://www.github.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
								>
									GitHub
								</FooterLink>
								<FooterLink
									href="https://www.discord.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
								>
									Discord
								</FooterLink>
							</FooterLinkGroup>
						</div>

						<div>
							<FooterTitle title="Legal" />
							<FooterLinkGroup col>
								<FooterLink
									href="#"
									className="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
								>
									Privacy Policy
								</FooterLink>
								<FooterLink
									href="#"
									className="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
								>
									Terms & Conditions
								</FooterLink>
							</FooterLinkGroup>
						</div>
					</div>
				</div>

				{/* Divider */}
				<FooterDivider />

				{/* Bottom section */}
				<div className="w-full flex justify-between items-center align-middle">
					<FooterCopyright
						href="/"
						by="MindDraft"
						year={new Date().getFullYear()}
					/>
					<div className="flex gap-6 mt-0  justify-center sm:justify-start">
						<FooterIcon
							href="#"
							icon={BsFacebook}
							className="hover:text-blue-500"
						/>
						<FooterIcon
							href="#"
							icon={BsTwitter}
							className="hover:text-blue-500"
						/>
						<FooterIcon
							href="#"
							icon={BsInstagram}
							className="hover:text-blue-500"
						/>
						<FooterIcon
							href="#"
							icon={BsGithub}
							className="hover:text-blue-500"
						/>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default FooterCompoment;
