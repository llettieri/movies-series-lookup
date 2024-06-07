import { routes } from '@/config/routes';
import { Collection } from '@/models/Collection';
import { CollectionDto } from '@/models/dto/CollectionDto';
import { axiosInstance } from '@/services/AxiosService';
import { parseCollectionDto } from '@/services/ParseService';
import { parseTemplate } from 'url-template';

const axios = axiosInstance(process.env.NEXT_PUBLIC_API_KEY);

const getCollectionDetails = async (
    collectionId: number,
): Promise<Collection> => {
    const url = parseTemplate(routes.collection.byId.details).expand({
        id: collectionId,
    });

    return await axios
        .get<CollectionDto>(url)
        .then((r) => parseCollectionDto(r.data));
};

export { getCollectionDetails };
