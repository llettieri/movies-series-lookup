import Image from "next/image";
import React from "react";

export default function Hero() {
	return (
		<div className="text-center bg-white pb-10">
			<div className="w-60 mx-auto">
				<Image className="block mx-auto" src={"/netflix_icon.svg"} width={200} height={200} alt={"Videofiles"}/>
				<h1 className="text-2xl text-gray-700 uppercase font-bold">Welcome to your Movie / Series lookup</h1>
			</div>
		</div>
	);
}
