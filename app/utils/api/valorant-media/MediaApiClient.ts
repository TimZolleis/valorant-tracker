import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';

export class MediaApiClient {
    axios: AxiosInstance;

    constructor() {
        this.axios = this.getClient();
    }

    private getClient() {
        return axios.create({
            baseURL: MEDIA_API_ENDPOINTS.BASE,
        });
    }

    async get(url: string) {
        return await this.axios.get(url).then((res) => this.parseMediaResponse(res));
    }

    parseMediaResponse(response: AxiosResponse) {
        return response.data.data;
    }
}

export const MEDIA_API_ENDPOINTS = {
    BASE: 'https://valorant-api.com/v1',

    VERSION: '/version',
};
