import { Person } from '@/models/Person';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';

interface MediaCardProps {
    person: Person;
}

export default function PersonCard({ person }: MediaCardProps): ReactElement {
    const image = person.portrait ?? '/placeholder.png';

    return (
        <Link href={`/people/${person.id}`}>
            <div className="w-48 h-full flex flex-col bg-primary shadow-sm rounded-md cursor-pointer transition-transform hover:scale-110 hover:drop-shadow-lg duration-150">
                <Image
                    src={image}
                    width={200}
                    height={300}
                    alt={''}
                    className="rounded-t-md"
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                    loading="lazy"
                />
                <div className="flex-1 flex flex-col justify-between px-6 py-2">
                    <h2 className="font-bold text-primaryText text-xl mb-1">
                        {person.name}
                    </h2>
                    <p className="text-primaryText text-base mb-1">
                        {person.department}
                    </p>
                </div>
            </div>
        </Link>
    );
}
