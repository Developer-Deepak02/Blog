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
import { ImBlog } from "react-icons/im";
import React from "react";

const Header = () => {
	const path = useLocation().pathname;
	return (
		<Navbar>
			<Link
				to="/"
				className="text-xl font-semibold text-white self-center whitespace-nowrap text:sm sm:text-xl dark:text-white"
			>
				<span className="px-2 py-1  border-2 border-white mr-2 rounded-lg text-2xl">
				Mind
				</span>
				Draft
			</Link>
			{/* <form>
				<TextInput
					type="text"
					placeholder="Search..."
					rightIcon={AiOutlineSearch}
					className="hidden lg:inline"
				/>
			</form> */}
			<div className="flex gap-2 md:order-2">
				<Button color={"gray"}>
					{" "}
					{/*className="lg:hidden"*/}
					<AiOutlineSearch />
				</Button>
				<Button className=" sm:inline hidden " color={"gray"}>
					<FaMoon />
				</Button>
				<Link to="/signin">
					<Button gradientDuoTone="purpleToBlue" outline>
						Sign In
					</Button>
				</Link>
				<NavbarToggle />
			</div>
			<NavbarCollapse>
				<NavbarLink active={path === "/"} as={"div"}>
					<Link to="/Home">Home</Link>
				</NavbarLink>
				<NavbarLink active={path === "/About"} as={"div"}>
					<Link to="/About">About</Link>
				</NavbarLink>
				<NavbarLink>
					<Link to="" active={path === "/"} as={"div"}>
						Projects
					</Link>
				</NavbarLink>
			</NavbarCollapse>
		</Navbar>
	);
};

export default Header;
