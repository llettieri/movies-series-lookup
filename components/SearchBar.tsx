import React, { ChangeEvent, ReactNode } from 'react';

interface SearchBarProps {
    defaultValue: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
    defaultValue,
    onChange,
}: SearchBarProps): ReactNode => {
    return (
        <input
            type="text"
            onChange={onChange}
            defaultValue={defaultValue}
            placeholder="Search..."
            autoFocus={true}
            className="mx-auto mt-16 block w-80 rounded-md border-0 bg-neutral p-2 shadow-md"
        />
    );
};
