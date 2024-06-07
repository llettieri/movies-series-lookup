import React, { ChangeEvent, ReactElement } from 'react';

interface SearchBarProps {
    defaultValue: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
    defaultValue,
    onChange,
}: SearchBarProps): ReactElement => {
    return (
        <input
            type="text"
            onChange={onChange}
            defaultValue={defaultValue}
            placeholder="Search..."
            autoFocus={true}
            className="form-input mx-auto mt-16 block w-80 rounded-md bg-neutral p-2 text-primaryText shadow-sm outline-0"
        />
    );
};
