import { ValorantUser } from '~/models/user/ValorantUser';
import { PlayerLoadout } from '~/models/interfaces/PlayerLoadout';
import { Puuid } from '~/models/interfaces/Player';
import { UrlBuilder } from '~/utils/request/url.server';
import { ValorantApiClient } from '~/utils/api/valorant/ApiClient';

export class PlayerApi {
    client: ValorantApiClient;

    constructor(user: ValorantUser) {
        this.client = new ValorantApiClient(user);
    }

    async getLoadout(): Promise<PlayerLoadout> {
        const url = new UrlBuilder(this.client.user.region).buildBaseUrl(
            PLAYER_ENDPOINT.LOADOUT(this.client.user.puuid)
        );
        return await this.client.get(url);
    }
}

const PLAYER_ENDPOINT = {
    LOADOUT: (puuid: Puuid) => `personalization/v2/players/${puuid}/playerloadout`,
};
