import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

function Spinner({
    className,
    ...props
}: React.ComponentProps<'svg'>): ReactNode {
    return (
        <Loader2Icon
            role="status"
            aria-label="Loading"
            className={cn('size-4 animate-spin', className)}
            {...props}
        />
    );
}

export { Spinner };
