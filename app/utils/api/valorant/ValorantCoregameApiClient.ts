import type {
    ValorantPlayerResponse,
    Puuid,
} from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import type { MatchId } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { RiotRequest } from '~/utils/request/url.server';
import type { ValorantCoreGame } from '~/models/interfaces/valorant-ingame/ValorantCoreGame';
import { NoCoreGameException } from '~/models/exception/game/NoCoreGameException';
import type { ValorantGameApiClient } from '~/utils/api/valorant/ValorantGameApiClient';

export class ValorantCoreGameApiClient {
    client: ValorantGameApiClient;

    constructor(client: ValorantGameApiClient) {
        this.client = client;
    }

    async getPlayer(): Promise<ValorantPlayerResponse> {
        return await this.client.axios
            .get(
                new RiotRequest(this.client.user.region).buildMatchUrl(
                    COREGAME_ENDPOINTS.GET_PLAYER(this.client.user.puuid)
                )
            )
            .then((res) => res.data)
            .catch((error) => {
                throw new NoCoreGameException();
            });
    }

    async getMatch(matchId: MatchId): Promise<ValorantCoreGame> {
        return await this.client.axios
            .get(
                new RiotRequest(this.client.user.region).buildMatchUrl(
                    COREGAME_ENDPOINTS.GET_MATCH(matchId)
                )
            )
            .then((res) => res.data)
            .catch((error) => {
                throw new NoCoreGameException();
            });
    }
}

const COREGAME_ENDPOINTS = {
    GET_PLAYER: (puuid: Puuid) => `/core-game/v1/players/${puuid}`,
    GET_MATCH: (matchId: MatchId) => `/core-game/v1/matches/${matchId}`,
    GET_MATCH_LOADOUTS: (matchId: MatchId) => `/core-game/v1/matches/${matchId}/loadouts`,
};
