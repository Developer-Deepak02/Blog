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
import { useSelector } from "react-redux";

const Header = () => {
	const path = useLocation().pathname;
	const { currentUser } = useSelector((state) => state.user);

	return (
		<Navbar className="border-b-2 border-gray-700">
			<Link
				to="/"
				className="text-xl font-semibold text-white self-center whitespace-nowrap text:sm sm:text-xl dark:text-white"
			>
				<span className="px-2 py-1 border-2 border-white mr-2 rounded-lg text-2xl">
					Mind
				</span>
				Draft
			</Link>

			<div className="flex gap-8 md:order-2 mr-3">
				<form>
					<TextInput
						type="text"
						placeholder="Search..."
						rightIcon={AiOutlineSearch}
						className="hidden lg:inline"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</form>
				{/* <Button color="gray">
					<AiOutlineSearch />
				</Button> */}
				{currentUser ? (
					<Dropdown
						arrowIcon={false}
						inline={true}
						label={
							<Avatar
								alt="User"
								img={currentUser?.profilePicture || "/userPic.jpg"}
								className=" cursor-pointer"
								rounded="full"
							/>
						}
					>
						<DropdownHeader>
							<span className="block text-sm">
								Username: {currentUser?.username}
							</span>
							<span className="mt-2 block truncate text-sm font-medium">
								Email: {currentUser?.email}
							</span>
						</DropdownHeader>
						<Link to="/dashboard?tab=profile">
							<DropdownItem>Profile</DropdownItem>
						</Link>
						<DropdownDivider />
						<DropdownItem>Sign Out</DropdownItem>
					</Dropdown>
				) : (
					<Link to="/signin">
						<Button outline>Sign In</Button>
					</Link>
				)}

				<NavbarToggle />
			</div>

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
	);
};

export default Header;
