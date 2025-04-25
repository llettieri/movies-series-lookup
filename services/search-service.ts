import { routes } from '@/config/routes';
import { ListDto } from '@/models/dto/ListDto';
import { MultiMediaDto } from '@/models/dto/MultiMediaDto';
import { PersonDto } from '@/models/dto/PersonDto';
import { TMDBApi } from '@/services/api';
import { parseTemplate } from 'url-template';

const multiSearch = async (
    query: string,
): Promise<ListDto<MultiMediaDto | PersonDto>> => {
    const url = parseTemplate(routes.search.multi).expand({ query });

    return await TMDBApi.get<ListDto<MultiMediaDto | PersonDto>>(url).then(
        (r) => r.data,
    );
};

export { multiSearch };
