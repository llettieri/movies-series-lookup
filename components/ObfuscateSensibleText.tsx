'use client';

import { Obfuscate } from '@south-paw/react-obfuscate-ts';
import React, { ReactNode } from 'react';

interface ObfuscateTextProps {
    email?: string;
    tel?: string;
}

export const ObfuscateSensibleText = ({
    email,
    tel,
}: ObfuscateTextProps): ReactNode => {
    return <Obfuscate email={email} tel={tel} className="underline" />;
};
