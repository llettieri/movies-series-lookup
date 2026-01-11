'use client';
import { Button as FBButton, ButtonProps } from 'flowbite-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export const Button = (props: ButtonProps): ReactNode => {
    const params = props as Omit<ButtonProps, 'children'>;

    return (
        <FBButton as={props.href ? Link : undefined} {...params}>
            {props.children}
        </FBButton>
    );
};
