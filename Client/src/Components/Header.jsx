import {
	Avatar,
	Button,
	Dropdown,
	DropdownDivider,
	DropdownHeader,
	DropdownItem,
	Navbar,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle,
	TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signoutSucess } from "../redux/userSlice";

const Header = () => {
	const path = useLocation().pathname;
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// handle signout	-->	-->	-->
		const handleSignout = async () => {
			try {
				const res = await fetch("/api/user/signout", {
					method: "POST",
				});
				const data = await res.json();
				if (!res.ok) {
					console.log(data.message);
				} else {
					dispatch(signoutSucess());
				}
			} catch (error) {
				console.log(error.message);
			}
		};

	return (
		<Navbar
			className="border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
			fluid
			rounded
		>
			{/* Brand */}
			<Link
				to="/"
				className="text-xl font-bold self-center whitespace-nowrap sm:text-xl dark:text-white text-gray-700"
			>
				<span className="px-2 py-1 border-2 border-blue-500 mr-2 rounded-lg text-2xl text-blue-500 dark:text-blue-400">
					Mind
				</span>
				Draft
			</Link>

			{/* Right side */}
			<div className="flex gap-4 items-center md:order-2">
				{/* Search (shown only on large screens) */}
				<form className="hidden lg:block">
					<TextInput
						type="text"
						placeholder="Search..."
						rightIcon={AiOutlineSearch}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</form>

				{/* Theme toggle button */}
				<Button outline size="sm" className="rounded-md cursor-pointer">
					<FaMoon />
				</Button>

				{/* Auth dropdown / Sign in */}
				{currentUser ? (
					<Dropdown
						arrowIcon={false}
						inline
						label={
							<Avatar
								alt="User Avatar"
								img={currentUser?.profilePicture || "/userPic.jpg"}
								className="cursor-pointer"
								rounded
							/>
						}
					>
						<DropdownHeader>
							<span className="block text-sm font-medium">
								username : @{currentUser?.username}
							</span>
							<span className="block text-sm truncate">
								Email : {currentUser?.email}
							</span>
						</DropdownHeader>
						<Link to="/dashboard?tab=profile">
							<DropdownItem>Profile</DropdownItem>
						</Link>
						<DropdownDivider />
						<DropdownItem onClick={handleSignout}>Sign Out</DropdownItem>
					</Dropdown>
				) : (
					<Link to="/signin">
						<Button outline size="sm" className="cursor-pointer">
							Sign In
						</Button>
					</Link>
				)}

				{/* Mobile menu toggle */}
				<NavbarToggle />
			</div>

			{/* Collapsible nav links */}
			<NavbarCollapse>
				<NavbarLink as={Link} to="/" active={path === "/"}>
					Home
				</NavbarLink>
				<NavbarLink as={Link} to="/about" active={path === "/about"}>
					About
				</NavbarLink>
				<NavbarLink as={Link} to="/projects" active={path === "/projects"}>
					Projects
				</NavbarLink>
			</NavbarCollapse>
		</Navbar>
		// <Navbar className="border-b-1 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 ">
		// 	<Link
		// 		to="/"
		// 		className="text-xl font-bold  self-center whitespace-nowrap text:sm sm:text-xl dark:text-white"
		// 	>
		// 		<span className="px-2 py-1 border-2 border-blue-500 mr-2 rounded-lg text-2xl text-blue-500 dark:text-blue-400">
		// 			Mind
		// 		</span>
		// 		Draft
		// 	</Link>

		// 	<div className="flex gap-8 md:order-2 mr-3">
		// 		<form>
		// 			<TextInput
		// 				type="text"
		// 				placeholder="Search..."
		// 				rightIcon={AiOutlineSearch}
		// 				className="hidden lg:inline"
		// 				onChange={(e) => setSearchTerm(e.target.value)}
		// 			/>
		// 		</form>
		// 		<Button outline className="cursor-pointer">
		// 			<FaMoon />
		// 		</Button>
		// 		{currentUser ? (
		// 			<Dropdown
		// 				arrowIcon={false}
		// 				inline={true}
		// 				label={
		// 					<Avatar
		// 						alt="User"
		// 						img={currentUser?.profilePicture || "/userPic.jpg"}
		// 						className=" cursor-pointer"
		// 						rounded="full"
		// 					/>
		// 				}
		// 			>
		// 				<DropdownHeader>
		// 					<span className="block text-sm">
		// 						Username: {currentUser?.username}
		// 					</span>
		// 					<span className="mt-2 block truncate text-sm font-medium">
		// 						Email: {currentUser?.email}
		// 					</span>
		// 				</DropdownHeader>
		// 				<Link to="/dashboard?tab=profile">
		// 					<DropdownItem>Profile</DropdownItem>
		// 				</Link>
		// 				<DropdownDivider />
		// 				<DropdownItem onClick={handleSignout}>Sign Out</DropdownItem>
		// 			</Dropdown>
		// 		) : (
		// 			<Link to="/signin">
		// 				<Button outline>Sign In</Button>
		// 			</Link>
		// 		)}

		// 		<NavbarToggle />
		// 	</div>

		// 	<NavbarCollapse>
		// 		<NavbarLink as={Link} to="/" active={path === "/"}>
		// 			Home
		// 		</NavbarLink>
		// 		<NavbarLink as={Link} to="/about" active={path === "/about"}>
		// 			About
		// 		</NavbarLink>
		// 		<NavbarLink as={Link} to="/projects" active={path === "/projects"}>
		// 			Projects
		// 		</NavbarLink>
		// 	</NavbarCollapse>
		// </Navbar>
	);
};

export default Header;
