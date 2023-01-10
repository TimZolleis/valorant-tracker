import { MediaApiClient } from '~/utils/api/valorant-media/MediaApiClient';
import { Puuid } from '~/models/interfaces/Player';
import { ValorantMediaApiPlayerCardResponse } from '~/models/interfaces/MediaApiResponse';

class PlayerMediaApi {
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
