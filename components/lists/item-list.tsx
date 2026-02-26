import React, { ReactNode } from 'react';
import { ListBase } from '@/components/lists/list-base';
import { ItemCard } from '@/components/cards/item-card';
import { Item } from '@/models/base';

interface ItemListProps {
    title: string;
    loadItems?: () => Promise<Item[]>;
    items?: Item[];
}

export const ItemList = async ({
    title,
    loadItems,
    items = [],
}: ItemListProps): Promise<ReactNode> => {
    if (loadItems) {
        items = await loadItems();
    }

    if (!items.length) {
        return null;
    }

    return (
        <ListBase title={title}>
            <>
                {items.map((item) => (
                    <li key={item.id}>
                        <ItemCard key={item.id} item={item} size="normal" />
                    </li>
                ))}
            </>
        </ListBase>
    );
};
