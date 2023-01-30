import Link from "next/link";
import {Person} from "../service/PersonService";

export default function PersonItem({persons}: { persons: Person[] }) {
	return (
		<>
			{
				persons.map(p =>
					<Link key={p.id} href={`/person/${p.id}`}>
						<span className="font-bold">{p.name} as {p.character}, </span>
					</Link>
				)
			}
		</>
	);
}
