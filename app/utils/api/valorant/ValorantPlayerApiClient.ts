import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { ValorantPlayerLoadout } from '~/models/interfaces/valorant-ingame/ValorantPlayerLoadout';
import type { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import { RiotRequest } from '~/utils/request/url.server';
import { ValorantGameApiClient } from '~/utils/api/valorant/ValorantGameApiClient';
import type {
    ValorantCompetitiveUpdate,
    ValorantMatch,
} from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { ValorantPlayerMMR } from '~/models/interfaces/valorant-ingame/ValorantPlayerMMR';
import { ValorantNameService } from '~/models/interfaces/valorant-ingame/ValorantNameService';

export class ValorantPlayerApiClient {
    client: ValorantGameApiClient;

    constructor(user: AuthenticatedValorantUser) {
        this.client = new ValorantGameApiClient(user);
    }

    async getLoadout(): Promise<ValorantPlayerLoadout> {
        const url = new RiotRequest(this.client.user.region).buildBaseUrl(
            PLAYER_ENDPOINT.LOADOUT(this.client.user.puuid)
        );
        return await this.client.get(url);
    }

    async getLatestCompetitiveUpdate(
        competitive: boolean = false,
        puuid: Puuid
    ): Promise<ValorantMatch> {
        const response: ValorantCompetitiveUpdate = await this.client.get(
            new RiotRequest(this.client.user.region).buildBaseUrl(
                PLAYER_ENDPOINT.COMPETITIVE_UPDATES(puuid)
            ),
            //@ts-ignore
            {
                params: {
                    ...(competitive ? { queue: 'competitive' } : {}),
                    startIndex: 0,
                    endIndex: 1,
                },
            }
        );
        return response.Matches[0];
    }

    async getMMR(puuid?: string): Promise<ValorantPlayerMMR> {
        return await this.client.get(
            new RiotRequest(this.client.user.region).buildBaseUrl(
                PLAYER_ENDPOINT.MMR(puuid ? puuid : this.client.user.puuid)
            ),
            undefined,
            {
                key: 'mmr',
                expiration: 900,
            }
        );
    }

    async getPlayerNames(puuids: Puuid[]): Promise<ValorantNameService[]> {
        return await this.client.put(
            new RiotRequest(this.client.user.region).buildBaseUrl(PLAYER_ENDPOINT.NAME_SERVICE),
            puuids
        );
    }
}

const PLAYER_ENDPOINT = {
    LOADOUT: (puuid: Puuid) => `personalization/v2/players/${puuid}/playerloadout`,
    COMPETITIVE_UPDATES: (puuid: Puuid) => `mmr/v1/players/${puuid}/competitiveupdates`,
    MMR: (puuid: Puuid) => `mmr/v1/players/${puuid}`,
    NAME_SERVICE: 'name-service/v2/players',
};
