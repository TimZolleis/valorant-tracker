import { ValorantMediaCompetitiveTier } from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveTier';
import { PlayerRank } from '~/utils/player/rank.server';
import { ValorantMediaSeason } from '~/models/interfaces/valorant-media/ValorantMediaSeason';

export class PlayerStatistics {
    topRank: ValorantMediaCompetitiveTier;
    rank: PlayerRank;
    totalStatistics: Statistics;
}

class Statistics {
    winRate: number;
    gamesPlayed: number;
    gamesWon: number;
}

class SeasonalStatistics {
    season: ValorantMediaSeason;
    gamesPlayed: number;
    gamesWon: number;
}
