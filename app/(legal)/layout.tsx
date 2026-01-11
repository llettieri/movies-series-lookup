import React, { ReactNode } from 'react';

import styles from './legal.module.css';

export default function LegalLayout({ children }: LayoutProps<'/'>): ReactNode {
    return (
        <div className="flex flex-col md:items-center">
            <div className={styles.legal}>{children}</div>
        </div>
    );
}
