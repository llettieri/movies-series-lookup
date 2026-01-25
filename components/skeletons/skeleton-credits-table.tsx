import { PersonCard } from '@/components/cards/person-card';
import React, { ReactNode, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonCardVerticalList } from '@/components/skeletons/skeleton-card-vertical-list';
import { SkeletonCard } from '@/components/skeletons/skeleton-card';

// interface GroupedCrewComponentProps {
//     groupedCrew: Map<string, Person[]>;
// }
//
// const GroupedCrewComponent = ({
//     groupedCrew,
// }: GroupedCrewComponentProps): ReactNode => {
//     const groups: ReactNode[] = [];
//     groupedCrew.forEach((people, department) =>
//         groups.push(
//             <div key={department} className="mb-2">
//                 <h2
//                     className="text-foreground mb-0!"
//                     id={department.toLowerCase()}
//                 >
//                     {department}
//                 </h2>
//                 <ul className="flex flex-col flex-wrap gap-4">
//                     {people.map((p) => {
//                         const mappedJobs = p.jobs?.map((j) => j.name);
//                         return (
//                             <li key={`crew-${p.id}-${mappedJobs?.join('-')}`}>
//                                 <PersonCard person={p} size="small" />
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </div>,
//         ),
//     );
//     return <>{groups}</>;
// };

interface SkeletonCreditsTableProps {
    title: string;
    itemCount?: number;
    departmentCount?: number;
}

export const SkeletonCreditsTable = ({
    title,
    itemCount = 30,
    departmentCount = 3,
}: SkeletonCreditsTableProps): ReactNode => {
    const calculateItemsPerDepartment = (index: number): number =>
        Math.ceil(itemCount / (index + departmentCount));

    return (
        <>
            <div className="container mx-auto flex justify-center p-8">
                <Button className="w-64">Go back</Button>
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-8 px-2 py-5 md:grid-cols-2 md:px-0">
                <div>
                    <h1 className="text-foreground mx-auto mb-3 flex w-fit gap-2 md:w-full">
                        {title} Cast
                        <span className="text-tag flex items-center font-light">
                            (<Skeleton className="h-8 w-16" />)
                        </span>
                    </h1>
                    <ul className="flex flex-col justify-center gap-4 md:justify-start">
                        {Array.from({ length: itemCount }).map(
                            (value, index) => (
                                <li key={index}>
                                    <SkeletonCard size="small" />
                                </li>
                            ),
                        )}
                    </ul>
                </div>
                <div>
                    <h1 className="text-foreground mx-auto mb-3 flex w-fit gap-2 md:w-full">
                        {title} Crew
                        <span className="text-tag flex items-center font-light">
                            (<Skeleton className="mb-0 h-8 w-16" />)
                        </span>
                    </h1>
                    <div className="flex flex-col justify-center gap-4 md:justify-start">
                        {Array.from({ length: departmentCount }).map(
                            (value, index) => (
                                <div key={index} className="mb-2">
                                    <Skeleton className="mb-2 h-8 w-24" />

                                    <ul className="flex flex-col flex-wrap gap-4">
                                        {Array.from({
                                            length: calculateItemsPerDepartment(
                                                index,
                                            ),
                                        }).map((value, index) => {
                                            return (
                                                <li key={index}>
                                                    <SkeletonCard size="small" />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
