'use client';

import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';
import React, { ReactNode } from 'react';

function AspectRatio({
    ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>): ReactNode {
    return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
