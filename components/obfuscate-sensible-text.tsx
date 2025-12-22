'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ObfuscateTextProps {
    content: string;
    type: 'tel' | 'email';
}

export const ObfuscateSensibleText = ({
    content,
    type,
}: ObfuscateTextProps): ReactNode => {
    const [href, setHref] = useState('#');
    const prefix = type == 'email' ? 'mailto:' : 'tel:';

    useEffect(() => {
        // Decode at runtime (scrapers miss this)
        setHref(`${prefix}${content}`);
    }, [content, prefix]);

    const obfuscatedText = content.split('').reverse().join('');

    return (
        <a
            href={href}
            className="obfuscated underline"
            aria-label="focus to reveal"
        >
            {obfuscatedText}
        </a>
    );
};
