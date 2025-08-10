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
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signoutSucess } from "../redux/userSlice";

const Header = () => {
	const path = useLocation().pathname;
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [searchTerm, setSearchTerm] = useState("");

	const handleSignout = async () => {
		try {
			const res = await fetch("/api/user/signout", { method: "POST" });
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
			className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"
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

			{/* Right Actions */}
			<div className="flex gap-4 items-center md:order-2">
				{/* Desktop Search */}
				<form className="hidden lg:block">
					<TextInput
						type="text"
						placeholder="Search..."
						rightIcon={AiOutlineSearch}
						onChange={(e) => setSearchTerm(e.target.value)}
						value={searchTerm}
					/>
				</form>

				{/* Auth */}
				{currentUser ? (
					<div className="relative z-50">
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
									@{currentUser?.username}
								</span>
								<span className="block text-sm truncate">
									{currentUser?.email}
								</span>
							</DropdownHeader>
							<Link to="/dashboard?tab=dash">
								<DropdownItem>Dashboard</DropdownItem>
							</Link>
							<Link to="/dashboard?tab=profile">
								<DropdownItem>Profile</DropdownItem>
							</Link>
							<DropdownDivider />
							<DropdownItem onClick={handleSignout}>Sign Out</DropdownItem>
						</Dropdown>
					</div>
				) : (
					<Link to="/signin">
						<Button outline size="sm" className="cursor-pointer">
							Sign In
						</Button>
					</Link>
				)}

				{/* Mobile Menu Toggle */}
				<NavbarToggle />
			</div>

			{/* Collapsible Nav (Mobile) */}
			<NavbarCollapse>
				{/* Mobile Search */}
				<form className="block lg:hidden mb-3">
					<TextInput
						type="text"
						placeholder="Search..."
						rightIcon={AiOutlineSearch}
						onChange={(e) => setSearchTerm(e.target.value)}
						value={searchTerm}
					/>
				</form>

				<NavbarLink as={Link} to="/" active={path === "/"}>
					Home
				</NavbarLink>
				<NavbarLink as={Link} to="/about" active={path === "/about"}>
					About
				</NavbarLink>
				<NavbarLink
					as={Link}
					to="/create-post"
					active={path === "/create-post"}
				>
					Write a post
				</NavbarLink>
				<NavbarLink
					as={Link}
					to="/dashboard?tab=dash"
					active={path === "/dashboard?tab=dash"}
				>
					Dashboard
				</NavbarLink>
			</NavbarCollapse>
		</Navbar>
	);
};

export default Header;
