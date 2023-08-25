import { ArrowIcon } from '@/icons/ArrowIcon';
import { SearchIcon } from '@/icons/Search';

const ICONS = {
    ARROW: ArrowIcon,
    SEARCH: SearchIcon,
};

export type TIcons = keyof typeof ICONS;

export { ICONS };
