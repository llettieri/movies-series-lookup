import NavBar from "./NavBar";
import Meta from "./Meta";
import Footer from "./Footer";
import React, {ReactNode} from "react";

export default function Layout({children}: { children: ReactNode }) {
	return (
		<>
			<Meta/>
			<NavBar/>
			<main>
				{children}
			</main>
			<Footer/>
		</>
	);
}
