import type { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { PlayerRank } from '~/utils/player/rank.server';
import { ValorantSeasonalInfo } from '~/models/interfaces/valorant-ingame/ValorantPlayerMMR';
import { ValorantMediaSeason } from '~/models/interfaces/valorant-media/ValorantMediaSeason';

export class CompetitiveStatistics {
    topRank: number;
    competitiveUpdate: ValorantCompetitiveUpdate;
    rank: PlayerRank;
    seasonalInfo: ValorantSeasonalInfo & { winRate: number } & { season: ValorantMediaSeason };

    constructor(
        topRank: number,
        competitiveUpdate: ValorantCompetitiveUpdate,
        rank: PlayerRank,
        seasonalInfo: ValorantSeasonalInfo & { winRate: number } & { season: ValorantMediaSeason }
    ) {
        this.topRank = topRank;
        this.competitiveUpdate = competitiveUpdate;
        this.rank = rank;
        this.seasonalInfo = seasonalInfo;
    }
}
