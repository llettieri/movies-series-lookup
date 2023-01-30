import Meta from "../../components/Meta";
import Image from "next/image";
import {companyImageUrl} from "../../config";
import React from "react";
import {GetServerSidePropsContext} from "next";
import {Collection, fetchCollectionDetails} from "../../service/CollectionService";

export default function CollectionDetails({collection}: { collection: Collection }) {
	return (
		<div>
			<div className="container max-w-4xl mx-auto py-6">
				<Meta title={`${collection.name} | Details`}/>
				<div className="px-3">
					<Image
						src={`${companyImageUrl}${collection.backdrop_path}`}
						width={1000}
						height={600}
						className="rounded-md"
						placeholder="blur"
						blurDataURL="/placeholder.png"
						loading="lazy"
						alt="collection Wallpaper"
					/>1
					<h1 className="font-bold text-xl my-2">{collection.name}</h1>
					<p className="text-gray-600 text-sm mt-4">{collection.overview}</p>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const id: string = context.query["id"] as string;
	const collection: Collection = await fetchCollectionDetails(id);

	return {
		props: {
			collection
		}
	};
}
