import axios, { AxiosError, AxiosInstance } from 'axios';

export const api = (): AxiosInstance => {
    const instance = axios.create();
    instance.interceptors.request.use((r) => {
        r.headers.setAuthorization(`Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
        return r;
    });
    instance.interceptors.response.use(
        (r) => r,
        (e: AxiosError) => {
            // eslint-disable-next-line no-console
            console.error(
                'Request failed with status {} because of {}',
                e.code,
                e.message,
            );
        },
    );

    return instance;
};
