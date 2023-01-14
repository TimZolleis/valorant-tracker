interface Competitive {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: SeasonalInfoBySeasonID;
}

interface Custom {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: SeasonalInfoBySeasonID;
}

interface Deathmatch {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: SeasonalInfoBySeasonID;
}

interface Seeding {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: SeasonalInfoBySeasonID;
}

interface Spikerush {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: SeasonalInfoBySeasonID;
}

interface Swiftplay {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: SeasonalInfoBySeasonID;
}

interface WinsByTier {
    [key: string]: number;
}

interface SeasonalInfo {
    SeasonID: string;
    NumberOfWins: number;
    NumberOfWinsWithPlacements: number;
    NumberOfGames: number;
    Rank: number;
    CapstoneWins: number;
    LeaderboardRank: number;
    CompetitiveTier: number;
    RankedRating: number;
    WinsByTier: WinsByTier;
    GamesNeededForRating: number;
    TotalWinsNeededForRank: number;
}

interface SeasonalInfoBySeasonID {
    [key: string]: SeasonalInfo;
}

interface Unrated {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: SeasonalInfoBySeasonID;
}

interface QueueSkills {
    competitive: Competitive;
    custom: Custom;
    deathmatch: Deathmatch;
    seeding: Seeding;
    spikerush: Spikerush;
    swiftplay: Swiftplay;
    unrated: Unrated;
}

interface LatestCompetitiveUpdate {
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
    QueueSkills: QueueSkills;
    LatestCompetitiveUpdate: LatestCompetitiveUpdate;
    IsLeaderboardAnonymized: boolean;
    IsActRankBadgeHidden: boolean;
}
