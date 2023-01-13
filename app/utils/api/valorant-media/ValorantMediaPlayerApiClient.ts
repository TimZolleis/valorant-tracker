import { ValorantMediaApiClient } from '~/utils/api/valorant-media/ValorantMediaApiClient';
import type { ValorantMediaPlayerCard } from '~/models/interfaces/valorant-media/ValorantMediaPlayerCard';

export class PlayerMediaApi {
    client: ValorantMediaApiClient;

    constructor() {
        this.client = new ValorantMediaApiClient();
    }

    async fetchPlayerCard(cardUuid: string): Promise<ValorantMediaPlayerCard> {
        return await this.client.get(MEDIA_PLAYER_ENDPOINTS.PLAYERCARD(cardUuid));
    }
}

const MEDIA_PLAYER_ENDPOINTS = {
    PLAYERCARD: (uuid: string) => `/playercards/${uuid}`,
};
