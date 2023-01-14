import { ValorantGameApiClient } from '~/utils/api/valorant/ValorantGameApiClient';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import type { ValorantQueue } from '~/models/static/Queue';
import { RiotRequest } from '~/utils/request/url.server';
import type {
    ValorantCompetitiveUpdate,
    ValorantMatch,
} from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import {
    MatchId,
    ValorantMatchDetails,
} from '~/models/interfaces/valorant-ingame/ValorantMatchDetails';
import { Match } from '@testing-library/dom';

export class ValorantMatchApiClient {
    client: ValorantGameApiClient;

    constructor(user: AuthenticatedValorantUser) {
        this.client = new ValorantGameApiClient(user);
    }

    async getMatchHistory(puuid: Puuid, queue: ValorantQueue, numberOfGames: number = 2) {
        const startIndex = 0;
        return await this.client.get(
            new RiotRequest(this.client.user.region).buildBaseUrl(
                MATCH_ENDPOINTS.PLAYER_MATCH_HISTORY(puuid)
            ),
            {
                params: {
                    queue: queue,
                    startIndex: startIndex,
                    endIndex: numberOfGames,
                },
            }
        );
    }

    async getMatchDetails(matchId: MatchId): Promise<ValorantMatchDetails> {
        return await this.client.get(
            new RiotRequest(this.client.user.region).buildBaseUrl(
                MATCH_ENDPOINTS.MATCH_DETAILS(matchId)
            )
        );
    }

    async getCompetitiveUpdates(
        puuid: Puuid,
        queue: ValorantQueue,
        numberOfGames: number = 10
    ): Promise<ValorantCompetitiveUpdate> {
        return await this.client.get(
            new RiotRequest(this.client.user.region).buildBaseUrl(
                MATCH_ENDPOINTS.PLAYER_COMPETITIVE_UPDATES(puuid)
            ),
            {
                params: {
                    queue: queue,
                    startIndex: 0,
                    endIndex: numberOfGames,
                },
            }
        );
    }
}

const MATCH_ENDPOINTS = {
    PLAYER_MATCH_HISTORY: (puuid: Puuid) => `match-history/v1/history/${puuid}`,
    PLAYER_COMPETITIVE_UPDATES: (puuid: Puuid) => `mmr/v1/players/${puuid}/competitiveupdates`,
    MATCH_DETAILS: (matchId: MatchId) => `match-details/v1/matches/${matchId}`,
};
