import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    HttpStatusCode,
    InternalAxiosRequestConfig,
} from 'axios';
import { notFound } from 'next/navigation';

const responseErrorHandler = (error: AxiosError): Promise<never> => {
    const response = error.response;

    // eslint-disable-next-line no-console
    console.error(
        `${error.request.method} ${error.config?.url} ${response?.status} ${response?.statusText}`,
    );

    if (response?.status === HttpStatusCode.NotFound) {
        notFound();
    }

    return Promise.reject(error);
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
