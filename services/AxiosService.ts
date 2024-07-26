import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const authenticatedInstance = (): AxiosInstance => {
    const instance = axios.create();
    // TODO change to guest session instead of same auth token
    // const session = await getSession();

    instance.interceptors.request.use((r) => {
        r.headers.setAuthorization(`Bearer ${process.env.TMDB_API_KEY}`);

        return r;
    });

    instance.interceptors.response.use(
        (r) => r,
        (e: AxiosError) => {
            // eslint-disable-next-line no-console
            console.error(
                'Request failed with status %i because of %s',
                e.code,
                e.message,
            );
        },
    );

    return instance;
};

const instance = (): AxiosInstance => {
    const instance = axios.create();

    instance.interceptors.response.use(
        (r) => r,
        (e: AxiosError) => {
            // eslint-disable-next-line no-console
            console.error(
                'Request failed with status %i because of %s',
                e.code,
                e.message,
            );
        },
    );

    return instance;
};

const get = async <T>(
    url: string,
    auth?: boolean,
): Promise<AxiosResponse<T>> => {
    let axios = instance();

    if (auth) {
        axios = authenticatedInstance();
    }

    return await axios.get<T>(url);
};

const authTMDB = async <T>(url: string): Promise<AxiosResponse<T>> => {
    const headers = { Authorization: `Bearer ${process.env.TMDB_API_KEY}` };
    return await axios.create({ headers }).get<T>(url);
};

export { authTMDB, get };
