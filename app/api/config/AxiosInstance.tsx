import axios, { AxiosInstance } from 'axios';

export const api = (): AxiosInstance => {
    const instance = axios.create();
    instance.interceptors.request.use((r) => {
        r.headers.setAuthorization(`Bearer ${process.env.NEXT_PUBLIC_API_KEY}`);
        return r;
    });

    return instance;
};
