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
		<Footer container className="rounded-none">
			<div className="w-full max-w-7xl mx-auto">
				<div className="grid w-full justify-between sm:flex md:grid-cols-1 ">
					{/* logo */}
					<div className="mt-5">
						<Link
							to="/"
							className="text-xl font-semibold text-white self-center whitespace-nowrap text:lg sm:text-xl dark:text-white"
						>
							<span className="px-2 py-1 border-2 border-white mr-2 rounded-lg text-2xl">
								Mind
							</span>
							Draft
						</Link>
						<p className="text-xl font-semibold text-white mt-3">
							<span className="font-light text-gray-300">Turn</span> Thoughts
							into <span className="text-blue-400 font-bold">Reality</span>
						</p>
						<p className="text-sm text-gray-400 leading-relaxed mt-2">
							Draft your ideas, notes, or blogs — all in one place with
							MindDraft.
						</p>
					</div>
					{/* Footer links */}
					<div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
						<div>
							<FooterTitle title="About" />
							<FooterLinkGroup col>
								<FooterLink
									href="www.google.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400"
								>
									Google
								</FooterLink>
								<FooterLink href="/about" className="text-gray-400">
									About
								</FooterLink>
							</FooterLinkGroup>
						</div>
						{/* Follow us */}
						<div>
							<FooterTitle title="Follow us" />
							<FooterLinkGroup col>
								<FooterLink
									href="www.github.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400"
								>
									GitHub
								</FooterLink>
								<FooterLink
									href="www.discord.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400"
								>
									Discord
								</FooterLink>
							</FooterLinkGroup>
						</div>
						{/* leagle  */}
						<div>
							<FooterTitle title="Legal" />
							<FooterLinkGroup col>
								<FooterLink href="#" className="text-gray-400">
									Privacy Policy
								</FooterLink>
								<FooterLink href="#" className="text-gray-400">
									Terms & Conditions
								</FooterLink>
							</FooterLinkGroup>
						</div>
					</div>
				</div>
				{/* divider */}
				<FooterDivider />
				<div className="w-full sm:flex sm:justify-between sm:items-center">
					<FooterCopyright
						href="#"
						by="MindDraft"
						year={new Date().getFullYear()}
					/>
					<div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
						<FooterIcon href="#" icon={BsFacebook} />
						<FooterIcon href="#" icon={BsTwitter} />
						<FooterIcon href="#" icon={BsInstagram} />
						<FooterIcon href="#" icon={BsGithub} />
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default FooterCompoment;
