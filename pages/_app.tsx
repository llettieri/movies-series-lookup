import "../styles/globals.css";
import type {AppProps} from "next/app";
import Layout from "../components/Layout";
import React, {useEffect} from "react";

function MyApp({Component, pageProps}: AppProps) {
	useEffect(() => localStorage.setItem("movies", JSON.stringify([])));

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
