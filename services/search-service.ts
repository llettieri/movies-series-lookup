import { routes } from '@/config/routes';
import { ListDto } from '@/models/dto/list-dto';
import { MultiMediaDto } from '@/models/dto/multi-media-dto';
import { PersonDto } from '@/models/dto/person-dto';
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
