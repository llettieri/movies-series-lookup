import { axiosInstance } from '@/services/AxiosService';
import { AxiosInstance } from 'axios';
import { useState } from 'react';

export const useAxios = (bearer?: string): AxiosInstance => {
    const [axios] = useState(() => axiosInstance(bearer));

    return axios;
};
