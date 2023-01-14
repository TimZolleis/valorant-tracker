import { RiotRequest } from '~/utils/request/url.server';
import type {
    ValorantPlayerResponse,
    Puuid,
} from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import type { MatchId, ValorantPreGame } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { NoPreGameException } from '~/models/exception/game/NoPreGameException';
import { ValorantGameApiClient } from '~/utils/api/valorant/ValorantGameApiClient';
import type axios from 'axios';

export class ValorantPreGameApiClient {
    private client: ValorantGameApiClient;

    constructor(client: ValorantGameApiClient) {
        this.client = client;
    }

    async getMatchId(): Promise<string> {
        return await this.client.axios
            .get(
                new RiotRequest(this.client.user.region).buildMatchUrl(
                    PREGAME_ENDPOINTS.GET_PLAYER(this.client.user.puuid)
                )
            )
            .then((res) => res.data)
            .catch((error) => {
                throw new NoPreGameException();
            });
    }

    async getMatch(matchId: MatchId): Promise<ValorantPreGame> {
        return await this.client.axios
            .get(
                new RiotRequest(this.client.user.region).buildMatchUrl(
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
