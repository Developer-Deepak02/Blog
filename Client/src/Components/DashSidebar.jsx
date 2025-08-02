import React, { useState, useEffect, useRef } from "react";
import { Sidebar, SidebarItem, SidebarItemGroup } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSucess } from "../redux/userSlice";

const DashSidebar = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [tab, setTab] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef();

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const tabFromUrl = urlParams.get("tab");
		if (tabFromUrl) setTab(tabFromUrl);
	}, [location.search]);

	// Auto-close on outside click
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	// Lock scroll on mobile when sidebar is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [isOpen]);

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
		<div >
			{/* Hamburger Button */}
			{!isOpen && (
				<button
					onClick={() => setIsOpen(true)}
					className="md:hidden m-2  p-2 dark:bg-transparent text-gray-800 dark:text-white rounded-md shadow-md absolute z-50"
				>
					<HiMenu className="text-xl" />
				</button>
			)}

			{/* Sidebar Overlay */}
			{isOpen && <div className="fixed inset-0 z-40  md:hidden" />}

			{/* Sidebar */}
			<div
				ref={sidebarRef}
				className={`fixed top-[4rem] left-0 z-50 h-[calc(100vh-4rem)] md:static md:h-auto 
				${isOpen ? "translate-x-0" : "-translate-x-full"}
					w-64 h-full
					md:translate-x-0 md:relative md:h-screen md:block
				`}
			>
				<Sidebar
					aria-label="Sidebar"
					className="w-64 h-full border-r-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 relative"
				>
					{/* Close Button */}
					{isOpen && (
						<button
							onClick={() => setIsOpen(false)}
							className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
						>
							<HiX className="text-2xl" />
						</button>
					)}

					<SidebarItemGroup className="mt-8 md:mt-0">
						<Link to="/dashboard?tab=profile">
							<SidebarItem
								active={tab === "profile"}
								icon={HiUser}
								label={"user"}
								labelColor="dark"
								as="div"
							>
								Profile
							</SidebarItem>
						</Link>
						<SidebarItem
							onClick={handleSignout}
							icon={HiArrowSmRight}
							className="cursor-pointer"
						>
							Sign Out
						</SidebarItem>
					</SidebarItemGroup>
				</Sidebar>
			</div>
		</div>
	);
};

export default DashSidebar;
