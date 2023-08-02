import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { Collection } from '@/models/Collection';

async function getCollectionDetails(collectionId: number): Promise<Collection> {
    return await api()
        .get<Collection>(routes.collection.byId(collectionId))
        .then((r) => r.data);
}

export { getCollectionDetails };
