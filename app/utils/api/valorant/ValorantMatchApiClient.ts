import { ValorantGameApiClient } from '~/utils/api/valorant/ValorantGameApiClient';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import type { ValorantQueue } from '~/models/static/Queue';
import { RiotRequest } from '~/utils/request/url.server';
import type { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import {
    MatchId,
    ValorantMatchDetails,
} from '~/models/interfaces/valorant-ingame/ValorantMatchDetails';
import {
    ValorantMatchId,
    ValorantPreGame,
} from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { NoPreGameException } from '~/models/exception/game/NoPreGameException';
import { NoCoreGameException } from '~/models/exception/game/NoCoreGameException';
import { ValorantCoreGame } from '~/models/interfaces/valorant-ingame/ValorantCoreGame';
import { ValorantMatchHistory } from '~/models/interfaces/valorant-ingame/ValorantMatchHistory';
import {
    getAuthorizationHeader,
    getDefaultHeaders,
    getEntitlementsHeader,
} from '~/utils/axios/axios.server';

export class ValorantMatchApiClient {
    client: ValorantGameApiClient;

    constructor(user: AuthenticatedValorantUser) {
        this.client = new ValorantGameApiClient(user);
    }

    async getMatchHistory(
        puuid: Puuid,
        queue: ValorantQueue,
        numberOfGames: number = 2
    ): Promise<ValorantMatchHistory> {
        const startIndex = 0;

        return await this.client.get(
            new RiotRequest(this.client.user.region).buildBaseUrl(
                MATCH_ENDPOINTS.PLAYER_MATCH_HISTORY(puuid)
            ),
            // @ts-ignore
            {
                params: {
                    queue: queue,
                    startIndex: startIndex,
                    endIndex: numberOfGames,
                },
            },
            {
                key: 'matchhistory',
                expiration: 3600,
            }
        );
    }

    async getMatchDetails(matchId: MatchId): Promise<ValorantMatchDetails> {
        return await this.client.get(
            new RiotRequest(this.client.user.region).buildBaseUrl(
                MATCH_ENDPOINTS.MATCH_DETAILS(matchId)
            ),
            undefined,
            {
                key: 'matchdetails',
                expiration: 3600 * 12,
            }
        );
    }

    async getPregameMatchId(puuid: Puuid): Promise<ValorantMatchId> {
        try {
            return await this.client.get(
                new RiotRequest(this.client.user.region).buildMatchUrl(
                    PREGAME_ENDPOINTS.PREGAME_MATCH_ID(puuid)
                )
            );
        } catch (error: any) {
            throw new NoPreGameException();
        }
    }

    async getPregameMatch(pregameMatchId: MatchId): Promise<ValorantPreGame> {
        try {
            return await this.client.get(
                new RiotRequest(this.client.user.region).buildMatchUrl(
                    PREGAME_ENDPOINTS.PREGAME_MATCH(pregameMatchId)
                )
            );
        } catch (error) {
            throw new NoPreGameException();
        }
    }

    async getCoregameMatchId(puuid: Puuid): Promise<ValorantMatchId> {
        try {
            return await this.client.get(
                new RiotRequest(this.client.user.region).buildMatchUrl(
                    COREGAME_ENDPOINTS.COREGAME_MATCH_ID(puuid)
                )
            );
        } catch (error) {
            throw new NoCoreGameException();
        }
    }

    async getCoregameMatch(matchId: MatchId): Promise<ValorantCoreGame> {
        try {
            return await this.client.get(
                new RiotRequest(this.client.user.region).buildMatchUrl(
                    COREGAME_ENDPOINTS.COREGAME_MATCH(matchId)
                )
            );
        } catch (error) {
            throw new NoCoreGameException();
        }
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
            // @ts-ignore
            {
                params: {
                    queue: queue,
                    startIndex: 0,
                    endIndex: numberOfGames,
                },
            },
            {
                key: 'competitiveupdate',
                expiration: 900,
            }
        );
    }
}

const MATCH_ENDPOINTS = {
    PLAYER_MATCH_HISTORY: (puuid: Puuid) => `match-history/v1/history/${puuid}`,
    PLAYER_COMPETITIVE_UPDATES: (puuid: Puuid) => `mmr/v1/players/${puuid}/competitiveupdates`,
    MATCH_DETAILS: (matchId: MatchId) => `match-details/v1/matches/${matchId}`,
};

const PREGAME_ENDPOINTS = {
    PREGAME_MATCH_ID: (puuid: Puuid) => `pregame/v1/players/${puuid}`,
    PREGAME_MATCH: (matchId: MatchId) => `pregame/v1/matches/${matchId}`,
    PREGAME_LOADOUT: (matchId: MatchId) => `pregame/v1/matches/${matchId}/loadouts`,
};

const COREGAME_ENDPOINTS = {
    COREGAME_MATCH_ID: (puuid: Puuid) => `core-game/v1/players/${puuid}`,
    COREGAME_MATCH: (matchId: MatchId) => `core-game/v1/matches/${matchId}`,
    COREGAME_LOADOUT: (matchId: MatchId) => `core-game/v1/matches/${matchId}/loadouts`,
};
