import type {ValorantApiClient} from "~/utils/api/valorant/Client";
import {UrlBuilder} from "~/utils/request/url.server";
import type {PlayerResponse, Puuid} from "~/models/interfaces/Player";
import type {MatchId, PreGameMatch} from "~/models/interfaces/PregameMatch";

export class PreGameApi {
    private client: ValorantApiClient;
    constructor(client: ValorantApiClient) {
        this.client = client;
    }

    async getMatchId(): Promise<PlayerResponse> {
        return await this.client.axios.get(new UrlBuilder(this.client.region).buildMatchUrl(PREGAME_ENDPOINTS.GET_PLAYER(this.client.user.puuid))).then(res => res.data)
    }

    async getMatch(matchId: MatchId): Promise<PreGameMatch> {
        return await this.client.axios.get(new UrlBuilder(this.client.region).buildMatchUrl(PREGAME_ENDPOINTS.GET_MATCH(matchId))).then(res => res.data)
    }
}


const PREGAME_ENDPOINTS = {

    GET_PLAYER: (puuid: Puuid) => `/pregame/v1/players/${puuid}`,
    GET_MATCH: (matchId: MatchId) => `/pregame/v1/matches/${matchId}`,
    GET_MATCH_LOADOUTS: (matchId: MatchId) => `/pregame/v1/matches/${matchId}/loadouts`
}


