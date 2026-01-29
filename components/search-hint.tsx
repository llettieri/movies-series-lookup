'use client';

import React, { ReactNode } from 'react';
import { Kbd } from '@/components/ui/kbd';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

interface OperatingSystem {
    name?: string;
    version?: string;
}

interface SearchHintProps {
    os: OperatingSystem;
}

export const SearchHint = ({ os }: SearchHintProps): ReactNode => {
    const isMac = os.name?.toLowerCase().includes('mac');
    const actionKbd = isMac ? 'Cmd' : 'Ctrl';

    return (
        <Alert className="max-w-md">
            <InfoIcon />
            <AlertTitle>
                Please press{' '}
                <Kbd className="text-foreground">{actionKbd} + F</Kbd> to search
                for an individual person.
            </AlertTitle>
        </Alert>
    );
};
