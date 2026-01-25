import * as React from 'react';
import { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
    cn(
        'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    ),
    {
        variants: {
            variant: {
                default: cn(
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                ),
                destructive: cn(
                    'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white',
                ),
                outline: cn(
                    'bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs',
                ),
                secondary: cn(
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ),
                ghost: cn(
                    'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                ),
                link: cn('text-primary underline-offset-4 hover:underline'),
                icon: cn(
                    'bg-primary text-primary-foreground hover:bg-primary/90 rounded-full',
                ),
            },
            size: {
                default: cn('h-9 px-4 py-2 has-[>svg]:px-3'),
                xs: cn('h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5'),
                sm: cn('h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5'),
                lg: cn('h-10 rounded-md px-6 has-[>svg]:px-4'),
                icon: cn('size-9'),
                'icon-xs': cn('size-6 rounded-md'),
                'icon-sm': cn('size-8'),
                'icon-lg': cn('size-10'),
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

function Button({
    className,
    variant = 'default',
    size = 'default',
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }): ReactNode {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
