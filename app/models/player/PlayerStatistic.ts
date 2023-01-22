import { Tier } from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveTier';
import { PlayerRank } from '~/utils/player/rank.server';
import { ValorantMediaSeason } from '~/models/interfaces/valorant-media/ValorantMediaSeason';
import { calculateWinrate } from '~/utils/calculation/winrate.server';

export class PlayerStatistic {
    topRank: Tier;
    rank: PlayerRank;
    totalStatistics: TotalStatistic;
    seasonalStatistics: SeasonalStatistic[];
    constructor(
        topRank: Tier,
        rank: PlayerRank,
        totalStatistics: TotalStatistic,
        seasonalStatistics: SeasonalStatistic[]
    ) {
        this.topRank = topRank;
        this.rank = rank;
        this.totalStatistics = totalStatistics;
        this.seasonalStatistics = seasonalStatistics;
    }
}

export class TotalStatistic {
    winRate: number;
    gamesPlayed: number;
    gamesWon: number;
    constructor(winRate: number, gamesPlayed: number, gamesWon: number) {
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
        this.winRate = calculateWinrate(gamesWon, gamesPlayed);
    }
}

export class SeasonalStatistic {
    season: ValorantMediaSeason;
    gamesPlayed: number;
    gamesWon: number;
    seasonalWinRate: number;

    constructor(season: ValorantMediaSeason, gamesPlayed: number, gamesWon: number) {
        this.season = season;
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
        this.seasonalWinRate = calculateWinrate(this.gamesWon, this.gamesPlayed);
    }
}
