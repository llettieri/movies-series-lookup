import { api } from '@/app/api/config/AxiosInstance';
import { routes } from '@/app/api/config/routes';
import { Collection } from '@/models/Collection';
import { parseTemplate } from 'url-template';

async function getCollectionDetails(collectionId: number): Promise<Collection> {
    const url = parseTemplate(routes.collection.byId.details).expand({
        id: collectionId,
    });

    return await api()
        .get<Collection>(url)
        .then((r) => r.data);
}

export { getCollectionDetails };
