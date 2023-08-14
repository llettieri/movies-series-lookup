import React, { ChangeEvent, ReactElement } from 'react';

interface SearchBarProps {
    defaultValue: string;
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
            className="form-input mx-auto mt-16 block w-80 rounded-md border-2 border-gray-500 bg-gray-600 p-2 text-primaryText shadow-sm outline-0"
        />
    );
};