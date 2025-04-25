import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

const responseErrorHandler = (error: AxiosError): void => {
    // eslint-disable-next-line no-console
    console.error(
        `Request failed with status ${error.code} because of ${error.message}`,
    );
};

const TMDBApi: AxiosInstance = axios.create();

TMDBApi.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    request.headers.setAuthorization(`Bearer ${process.env.TMDB_API_KEY}`);

    return request;
});

TMDBApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    responseErrorHandler,
);

const Api: AxiosInstance = axios.create();

Api.interceptors.response.use(
    (response: AxiosResponse) => response,
    responseErrorHandler,
);

export { Api, TMDBApi };
