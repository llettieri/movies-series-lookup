import { routes } from '@/config/routes';
import { Collection } from '@/models/Collection';
import { CollectionDto } from '@/models/dto/CollectionDto';
import { parseCollectionDto } from '@/services/ParseService';
import { parseTemplate } from 'url-template';

import { get } from './AxiosService';

const getCollectionDetails = async (
    collectionId: number,
): Promise<Collection> => {
    const url = parseTemplate(routes.collection.byId.details).expand({
        id: collectionId,
    });

    return await get<CollectionDto>(url, true).then((r) =>
        parseCollectionDto(r.data),
    );
};

export { getCollectionDetails };
