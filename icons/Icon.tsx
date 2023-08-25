import { ICONS, TIcons } from '@/icons/Icons';
import { ReactElement } from 'react';

interface IconProps {
    icon: TIcons;
    width?: number;
    height?: number;
}

const Icon = ({ icon, width = 30, height }: IconProps): ReactElement => {
    const Element = ICONS[icon];
    return <Element width={width} height={height ?? width} />;
};

export { Icon };
