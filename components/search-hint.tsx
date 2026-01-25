'use client';

import { Alert, Kbd } from 'flowbite-react';
import { CustomFlowbiteTheme } from 'flowbite-react/types';
import React, { ReactNode } from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

interface OperatingSystem {
    name?: string;
    version?: string;
}

interface SearchHintProps {
    os: OperatingSystem;
}

const alertTheme: CustomFlowbiteTheme['alert'] = {
    color: {
        purple: 'bg-primary border-primary-tint text-foreground',
    },
};

export const SearchHint = ({ os }: SearchHintProps): ReactNode => {
    return (
        <Alert
            theme={alertTheme}
            color="purple"
            icon={IoAlertCircleOutline}
            withBorderAccent
        >
            <span>
                Please press{' '}
                {os.name?.toLowerCase().includes('mac') ? (
                    <Kbd className="text-primary">Cmd</Kbd>
                ) : (
                    <Kbd className="text-primary">Ctrl</Kbd>
                )}{' '}
                + <Kbd className="text-primary">F</Kbd> to search for an
                individual person.
            </span>
        </Alert>
    );
};
