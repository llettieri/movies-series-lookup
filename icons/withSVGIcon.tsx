import React, { ComponentType } from 'react';

export type IconType = ComponentType<IconProps>;

interface IconProps {
    id?: string;
    width?: number | string;
    height?: number | string;
    label?: string;
}

export default function withSVGIcon(
    WrappedComponent: ComponentType<IconProps>,
    viewBox: string,
    rotate?: string,
): IconType {
    const SvgIcon = (props: IconProps): React.ReactElement => {
        const { id, label, width, height } = props;

        return (
            <svg
                height={height}
                width={width}
                id={id}
                aria-label={label}
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox}
                transform={rotate}
            >
                <WrappedComponent {...props} />
            </svg>
        );
    };

    return SvgIcon;
}
