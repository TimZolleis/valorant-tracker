interface ValorantCompetitive {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: ValorantSeasonalInfoBySeasonID;
}

interface ValorantCustom {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: ValorantSeasonalInfoBySeasonID;
}

interface ValorantDeathmatch {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: ValorantSeasonalInfoBySeasonID;
}

interface ValorantSeeding {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: ValorantSeasonalInfoBySeasonID;
}

interface ValorantSpikerush {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: ValorantSeasonalInfoBySeasonID;
}

interface ValorantSwitftplay {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: ValorantSeasonalInfoBySeasonID;
}

interface ValorantWinsByTier {
    [key: string]: number;
}

export interface ValorantSeasonalInfo {
    SeasonID: string;
    NumberOfWins: number;
    NumberOfWinsWithPlacements: number;
    NumberOfGames: number;
    Rank: number;
    CapstoneWins: number;
    LeaderboardRank: number;
    CompetitiveTier: number;
    RankedRating: number;
    WinsByTier: ValorantWinsByTier;
    GamesNeededForRating: number;
    TotalWinsNeededForRank: number;
}

export interface ValorantSeasonalInfoBySeasonID {
    [key: string]: ValorantSeasonalInfo;
}

interface ValorantUnrated {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: ValorantSeasonalInfoBySeasonID;
}

interface ValorantQueueSkills {
    competitive: ValorantCompetitive;
    custom: ValorantCustom;
    deathmatch: ValorantDeathmatch;
    seeding: ValorantSeeding;
    spikerush: ValorantSpikerush;
    swiftplay: ValorantSwitftplay;
    unrated: ValorantUnrated;
}

interface ValorantLatestCompetitiveUpdate {
    MatchID: string;
    MapID: string;
    SeasonID: string;
    MatchStartTime: number;
    TierAfterUpdate: number;
    TierBeforeUpdate: number;
    RankedRatingAfterUpdate: number;
    RankedRatingBeforeUpdate: number;
    RankedRatingEarned: number;
    RankedRatingPerformanceBonus: number;
    CompetitiveMovement: string;
    AFKPenalty: number;
}

export interface ValorantPlayerMMR {
    Version: number;
    Subject: string;
    NewPlayerExperienceFinished: boolean;
    QueueSkills: ValorantQueueSkills;
    LatestCompetitiveUpdate: ValorantLatestCompetitiveUpdate;
    IsLeaderboardAnonymized: boolean;
    IsActRankBadgeHidden: boolean;
}
