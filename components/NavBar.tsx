import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
	return (
		<nav className="bg-gray-700">
			<div
				className="font-bold text-neutral-100 p-4 max-w-7xl mx-auto container tracking-widest flex justify-between align-middle">
				<Link className="text-base md:text-2xl" href="/">
                    Movie & Series Lookup
				</Link>
				<Link href="/search" className="flex gap-3 text-">
					<Image width={30} height={30} src={"/search_icon.svg"} alt="Search"/>
                    Search
				</Link>
			</div>
		</nav>
	);
}
