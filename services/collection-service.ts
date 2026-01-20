import { apiRoutes } from '@/config/api-routes';
import { Collection } from '@/models/collection';
import { CollectionDto } from '@/models/dto/collection-dto';
import { parseCollectionDto } from '@/services/parse-service';

import { TMDBApi } from './api';

const getCollectionDetails = async (
    collectionId: string,
): Promise<Collection> => {
    const url = apiRoutes.collection.byId.details.expand({
        id: collectionId,
    });

    return await TMDBApi.get<CollectionDto>(url).then((r) =>
        parseCollectionDto(r.data),
    );
};

export { getCollectionDetails };
