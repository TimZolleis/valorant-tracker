import { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import { ValorantPlayerLoadout } from '~/models/interfaces/valorant-ingame/ValorantPlayerLoadout';
import { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import { UrlBuilder } from '~/utils/request/url.server';
import { ValorantGameApiClient } from '~/utils/api/valorant/ValorantGameApiClient';

export class ValorantPlayerApiClient {
    client: ValorantGameApiClient;

    constructor(user: AuthenticatedValorantUser) {
        this.client = new ValorantGameApiClient(user);
    }

    async getLoadout(): Promise<ValorantPlayerLoadout> {
        const url = new UrlBuilder(this.client.user.region).buildBaseUrl(
            PLAYER_ENDPOINT.LOADOUT(this.client.user.puuid)
        );
        return await this.client.get(url);
    }
}

const PLAYER_ENDPOINT = {
    LOADOUT: (puuid: Puuid) => `personalization/v2/players/${puuid}/playerloadout`,
};
