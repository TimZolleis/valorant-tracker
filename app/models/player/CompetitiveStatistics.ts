import type { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { PlayerRank } from '~/utils/player/rank.server';
import { ValorantSeasonalInfo } from '~/models/interfaces/valorant-ingame/ValorantPlayerMMR';
import { ValorantMediaSeason } from '~/models/interfaces/valorant-media/ValorantMediaSeason';

export class CompetitiveStatistics {
    topTier: number;
    winRate: number;
    competitiveUpdate: ValorantCompetitiveUpdate;
    tier: PlayerRank;
    seasonalInfo: ValorantSeasonalInfo & { seasonalWinRate: number } & {
            season: ValorantMediaSeason;
        }[];

    constructor(
        topTier: number,
        competitiveUpdate: ValorantCompetitiveUpdate,
        tier: PlayerRank,
        seasonalInfo: ValorantSeasonalInfo & { seasonalWinRate: number } & {
                season: ValorantMediaSeason;
            }[]
    ) {
        this.topTier = topTier;
        this.competitiveUpdate = competitiveUpdate;
        this.tier = tier;
        this.seasonalInfo = seasonalInfo;
    }
}
