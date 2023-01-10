import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type { ValorantMediaApiVersionResponse } from '~/models/interfaces/MediaApiResponse';

export class ValorantMediaApi {
    client: AxiosInstance;

    constructor() {
        this.client = this.getClient();
    }

    private parseMediaResponse(response: AxiosResponse) {
        return response.data.data;
    }

    private getClient() {
        return axios.create({
            baseURL: MEDIA_API_ENDPOINTS.BASE,
        });
    }
    async getVersion(): Promise<ValorantMediaApiVersionResponse> {
        return await this.client
            .get(MEDIA_API_ENDPOINTS.VERSION)
            .then((res) => this.parseMediaResponse(res));
    }
}

const MEDIA_API_ENDPOINTS = {
    BASE: 'https://valorant-api.com/v1',

    VERSION: '/version',
};
