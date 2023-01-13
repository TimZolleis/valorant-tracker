import {
    MEDIA_API_ENDPOINTS,
    ValorantMediaApiClient,
} from '~/utils/api/valorant-media/ValorantMediaApiClient';
import { ValorantMediaVersion } from '~/models/interfaces/valorant-media/ValorantMediaVersion';

export class GeneralValorantMediaApi {
    client: ValorantMediaApiClient;

    constructor() {
        this.client = new ValorantMediaApiClient();
    }
    async getVersion(): Promise<ValorantMediaVersion> {
        return await this.client.axios
            .get(MEDIA_API_ENDPOINTS.VERSION)
            .then((res) => this.client.parseMediaResponse(res));
    }
}
