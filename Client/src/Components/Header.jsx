import {
	Button,
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

const Header = () => {
	const path = useLocation().pathname;

	return (
		<Navbar>
			<Link
				to="/"
				className="text-xl font-semibold text-white self-center whitespace-nowrap text:sm sm:text-xl dark:text-white"
			>
				<span className="px-2 py-1 border-2 border-white mr-2 rounded-lg text-2xl">
					Mind
				</span>
				Draft
			</Link>

			<div className="flex gap-2 md:order-2">
				<Button color="gray">
					<AiOutlineSearch />
				</Button>
				<Button className="hidden sm:inline" color="gray">
					<FaMoon />
				</Button>
				<Link to="/signin">
					<Button outline>Sign In</Button>
				</Link>
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
