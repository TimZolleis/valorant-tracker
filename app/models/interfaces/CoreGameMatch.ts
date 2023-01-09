
    export interface ConnectionDetails {
        GameServerHosts: string[];
        GameServerHost: string;
        GameServerPort: number;
        GameServerObfuscatedIP: number;
        GameClientHash: number;
        PlayerKey: string;
    }

    export interface PlayerIdentity {
        Subject: string;
        PlayerCardID: string;
        PlayerTitleID: string;
        AccountLevel: number;
        PreferredLevelBorderID: string;
        Incognito: boolean;
        HideAccountLevel: boolean;
    }

    export interface SeasonalBadgeInfo {
        SeasonID: string;
        NumberOfWins: number;
        WinsByTier?: any;
        Rank: number;
        LeaderboardRank: number;
    }

    export interface Player {
        Subject: string;
        TeamID: string;
        CharacterID: string;
        PlayerIdentity: PlayerIdentity;
        SeasonalBadgeInfo: SeasonalBadgeInfo;
        IsCoach: boolean;
        IsAssociated: boolean;
    }

    export interface MatchmakingData {
        QueueID: string;
        IsRanked: boolean;
    }

    export interface CoreGameMatch {
        MatchID: string;
        Version: number;
        State: string;
        MapID: string;
        ModeID: string;
        ProvisioningFlow: string;
        GamePodID: string;
        AllMUCName: string;
        TeamMUCName: string;
        TeamVoiceID: string;
        IsReconnectable: boolean;
        ConnectionDetails: ConnectionDetails;
        PostGameDetails?: any;
        Players: Player[];
        MatchmakingData: MatchmakingData;
    }

