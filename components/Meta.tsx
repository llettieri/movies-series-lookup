import Head from "next/head";
import React from "react";

export default function Meta({keywords, description, title}: { keywords: string, description: string, title: string }) {
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<meta name="keywords" content={keywords}/>
			<meta name="description" content={description}/>
			<meta charSet="utf-8"/>
			<title>{title}</title>
		</Head>
	);
}

Meta.defaultProps = {
	title: "Movies & Series Lookup",
	keywords: "movie, tv, series, popular",
	description: "browse movies and series"
};
