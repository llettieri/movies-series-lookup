import axios, { AxiosError, AxiosInstance } from 'axios';

export const axiosInstance = (bearer?: string): AxiosInstance => {
    const instance = axios.create();

    instance.interceptors.request.use((r) => {
        if (bearer) {
            r.headers.setAuthorization(`Bearer ${bearer}`);
        }

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
