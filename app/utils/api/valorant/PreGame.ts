import { UrlBuilder } from '~/utils/request/url.server';
import type { PlayerResponse, Puuid } from '~/models/interfaces/Player';
import type { MatchId, PreGameMatch } from '~/models/interfaces/PregameMatch';
import { NoPreGameException } from '~/models/exception/NoPreGameException';
import { ValorantApiClient } from '~/utils/api/valorant/ApiClient';
import type axios from 'axios';

export class PreGameApi {
    private client: ValorantApiClient;

    constructor(client: ValorantApiClient) {
        this.client = client;
    }

    async getMatchId(): Promise<string> {
        return await this.client.axios
            .get(
                new UrlBuilder(this.client.user.region).buildMatchUrl(
                    PREGAME_ENDPOINTS.GET_PLAYER(this.client.user.puuid)
                )
            )
            .then((res) => res.data)
            .catch((error) => {
                throw new NoPreGameException();
            });
    }

    async getMatch(matchId: MatchId): Promise<PreGameMatch> {
        return await this.client.axios
            .get(
                new UrlBuilder(this.client.user.region).buildMatchUrl(
                    PREGAME_ENDPOINTS.GET_MATCH(matchId)
                )
            )
            .then((res) => res.data)
            .catch((error) => {
                throw new NoPreGameException();
            });
    }
}

const PREGAME_ENDPOINTS = {
    GET_PLAYER: (puuid: Puuid) => `/pregame/v1/players/${puuid}`,
    GET_MATCH: (matchId: MatchId) => `/pregame/v1/matches/${matchId}`,
    GET_MATCH_LOADOUTS: (matchId: MatchId) => `/pregame/v1/matches/${matchId}/loadouts`,
};
