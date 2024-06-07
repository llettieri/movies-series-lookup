import { LeftArrowIcon, RightArrowIcon } from '@/icons/ArrowIcon';
import { SearchIcon } from '@/icons/Search';

const ICONS = {
    RIGHT_ARROW: RightArrowIcon,
    LEFT_ARROW: LeftArrowIcon,
    SEARCH: SearchIcon,
};

export type TIcons = keyof typeof ICONS;

export { ICONS };
