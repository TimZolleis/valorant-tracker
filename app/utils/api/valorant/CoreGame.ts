import type { PlayerResponse, Puuid } from '~/models/interfaces/Player';
import type { MatchId } from '~/models/interfaces/PregameMatch';
import { UrlBuilder } from '~/utils/request/url.server';
import type { CoreGameMatch } from '~/models/interfaces/CoreGameMatch';
import { NoCoreGameException } from '~/models/exception/NoCoreGameException';
import type { ValorantApiClient } from '~/utils/api/valorant/ApiClient';

export class CoreGameApi {
    client: ValorantApiClient;

    constructor(client: ValorantApiClient) {
        this.client = client;
    }

    async getPlayer(): Promise<PlayerResponse> {
        return await this.client.axios
            .get(
                new UrlBuilder(this.client.user.region).buildMatchUrl(
                    COREGAME_ENDPOINTS.GET_PLAYER(this.client.user.puuid)
                )
            )
            .then((res) => res.data)
            .catch((error) => {
                throw new NoCoreGameException();
            });
    }

    async getMatch(matchId: MatchId): Promise<CoreGameMatch> {
        return await this.client.axios
            .get(
                new UrlBuilder(this.client.user.region).buildMatchUrl(
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
