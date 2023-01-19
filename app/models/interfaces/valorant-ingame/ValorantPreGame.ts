import { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';

export type MatchId = string;

export interface ValorantPlayerIdentity {
    Subject: string;
    PlayerCardID: string;
    PlayerTitleID: string;
    AccountLevel: number;
    PreferredLevelBorderID: string;
    Incognito: boolean;
    HideAccountLevel: boolean;
}

export interface ValorantSeasonalBadgeInfo {
    SeasonID: string;
    NumberOfWins: number;
    WinsByTier?: any;
    Rank: number;
    LeaderboardRank: number;
}

export type ValorantPlayer = {
    Subject: string;
    CharacterID: string;
    CharacterSelectionState: string;
    PregamePlayerState: string;
    CompetitiveTier: number;
    PlayerIdentity: ValorantPlayerIdentity;
    SeasonalBadgeInfo: ValorantSeasonalBadgeInfo;
    IsCaptain: boolean;
};

interface ValorantTeam {
    TeamID: string;
    Players: ValorantPlayer[];
}

interface ValorantAllyPlayerIdentity {
    Subject: string;
    PlayerCardID: string;
    PlayerTitleID: string;
    AccountLevel: number;
    PreferredLevelBorderID: string;
    Incognito: boolean;
    HideAccountLevel: boolean;
}

interface ValorantAllyPlayer {
    Subject: string;
    CharacterID: string;
    CharacterSelectionState: string;
    PregamePlayerState: string;
    CompetitiveTier: number;
    PlayerIdentity: ValorantAllyPlayerIdentity;
    SeasonalBadgeInfo: ValorantSeasonalBadgeInfo;
    IsCaptain: boolean;
}

export interface ValorantAllyTeam {
    TeamID: string;
    Players: ValorantAllyPlayer[];
}

interface ValorantCastedVotes {}

export interface ValorantPreGame {
    ID: string;
    Version: number;
    Teams: ValorantTeam[];
    AllyTeam: ValorantAllyTeam;
    EnemyTeam?: any;
    ObserverSubjects: any[];
    MatchCoaches: any[];
    EnemyTeamSize: number;
    EnemyTeamLockCount: number;
    PregameState: string;
    LastUpdated: string;
    MapID: string;
    MapSelectPool: any[];
    BannedMapIDs: any[];
    CastedVotes: ValorantCastedVotes;
    MapSelectSteps: any[];
    MapSelectStep: number;
    Team1: string;
    GamePodID: string;
    Mode: string;
    VoiceSessionID: string;
    MUCName: string;
    QueueID: string;
    ProvisioningFlowID: string;
    IsRanked: boolean;
    PhaseTimeRemainingNS: number;
    StepTimeRemainingNS: number;
    altModesFlagADA: boolean;
    TournamentMetadata?: any;
    RosterMetadata?: any;
}

export interface ValorantMatchId {
    Subject: Puuid;
    MatchID: MatchId;
    Version: number;
}
