import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import type { ValorantMediaApiVersionResponse } from '~/models/interfaces/MediaApiResponse';
import { MEDIA_API_ENDPOINTS, MediaApiClient } from '~/utils/api/valorant-media/MediaApiClient';

export class GeneralValorantMediaApi {
    client: MediaApiClient;

    constructor() {
        this.client = new MediaApiClient();
    }
    async getVersion(): Promise<ValorantMediaApiVersionResponse> {
        return await this.client.axios
            .get(MEDIA_API_ENDPOINTS.VERSION)
            .then((res) => this.client.parseMediaResponse(res));
    }
}
