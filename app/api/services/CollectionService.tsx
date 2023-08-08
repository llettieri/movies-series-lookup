import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { parseCollectionDto } from '@/app/api/services/ParseService';
import { Collection } from '@/models/Collection';
import { CollectionDto } from '@/models/dto/CollectionDto';
import { parseTemplate } from 'url-template';

const getCollectionDetails = async (
    collectionId: number,
): Promise<Collection> => {
    const url = parseTemplate(routes.collection.byId.details).expand({
        id: collectionId,
    });

    return await api()
        .get<CollectionDto>(url)
        .then((r) => parseCollectionDto(r.data));
};

export { getCollectionDetails };
