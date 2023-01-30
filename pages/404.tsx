import Image from "next/image";
import Meta from "../components/Meta";
import React from "react";
import Link from "next/link";

export default function Page404() {
	return (
		<div className="flex flex-col gap-20 py-16">
			<Meta title="Page not found!"/>
			<Image className="mx-auto block" src="/notfound.svg" width={500} height={250} alt="404 Not found!"/>
			<button type="button" className="mx-auto block w-32 bg-blue-500 rounded-md text-white">
				<Link href="/">Return to home</Link>
			</button>
		</div>
	);
}
