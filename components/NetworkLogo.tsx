import {companyImageUrl} from "../config";
import Image from "next/image";
import {Network} from "../service/NetworkService";

export default function NetworkLogo({network}: { network: Network }) {
	return (
		<a href={network.homepage} target="_blank" className="my-auto" rel="noreferrer">
			<Image key={network.id}
				src={`${companyImageUrl}${network.logo_path}`}
				alt={network.name} width={100} height={50}/>
		</a>
	);
}
