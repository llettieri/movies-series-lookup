import { routes } from '@/config/routes';
import { Collection } from '@/models/Collection';
import { CollectionDto } from '@/models/dto/CollectionDto';
import { parseCollectionDto } from '@/services/parse-service';
import { parseTemplate } from 'url-template';

import { TMDBApi } from './api';

const getCollectionDetails = async (
    collectionId: number,
): Promise<Collection> => {
    const url = parseTemplate(routes.collection.byId.details).expand({
        id: collectionId,
    });

    return await TMDBApi.get<CollectionDto>(url).then((r) =>
        parseCollectionDto(r.data),
    );
};

export { getCollectionDetails };
