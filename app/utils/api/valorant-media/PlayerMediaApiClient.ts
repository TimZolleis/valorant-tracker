import { MediaApiClient } from '~/utils/api/valorant-media/MediaApiClient';
import type { ValorantMediaApiPlayerCardResponse } from '~/models/interfaces/MediaApiResponse';

export class PlayerMediaApi {
    client: MediaApiClient;

    constructor() {
        this.client = new MediaApiClient();
    }

    async fetchPlayerCard(cardUuid: string): Promise<ValorantMediaApiPlayerCardResponse> {
        return await this.client.get(MEDIA_PLAYER_ENDPOINTS.PLAYERCARD(cardUuid));
    }
}

const MEDIA_PLAYER_ENDPOINTS = {
    PLAYERCARD: (uuid: string) => `/playercards/${uuid}`,
};
