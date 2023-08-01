import { routes } from '@/app/api/config/routes';
import { Movie } from '@/models/Movie';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps): ReactElement {
    let image = '/placeholder.png';

    if (movie.poster_path && movie.poster_path !== 'null') {
        image = `${routes.images}${movie.poster_path}`;
    }

    return (
        <Link href={`/movies/${movie.id}`}>
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
                        {movie.title}
                    </h2>
                    <p className="text-primaryText text-base mb-1">
                        {dayjs(movie.release_date).format('MMMM DD, YYYY')}
                    </p>
                </div>
            </div>
        </Link>
    );
}
