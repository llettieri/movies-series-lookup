import React, { ReactNode } from 'react';
import { ListBase } from '@/components/lists/list-base';
import { ItemCard } from '@/components/cards/item-card';
import { Item } from '@/models/base';

interface ItemListProps<I> {
    title: string;
    loadItems?: () => Promise<I[]>;
    items?: I[];
}

export const ItemList = async <I extends Item>({
    title,
    loadItems,
    items = [],
}: ItemListProps<I>): Promise<ReactNode> => {
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
