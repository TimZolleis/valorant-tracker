import { ValorantSeasonalBadgeInfo } from '~/models/interfaces/valorant-ingame/ValorantPreGame';

interface ValorantConnectionDetails {
    GameServerHosts: string[];
    GameServerHost: string;
    GameServerPort: number;
    GameServerObfuscatedIP: number;
    GameClientHash: number;
    PlayerKey: string;
}

interface ValorantPlayerIdentity {
    Subject: string;
    PlayerCardID: string;
    PlayerTitleID: string;
    AccountLevel: number;
    PreferredLevelBorderID: string;
    Incognito: boolean;
    HideAccountLevel: boolean;
}

interface ValorantPlayer {
    Subject: string;
    TeamID: string;
    CharacterID: string;
    PlayerIdentity: ValorantPlayerIdentity;
    SeasonalBadgeInfo: ValorantSeasonalBadgeInfo;
    IsCoach: boolean;
    IsAssociated: boolean;
}

interface ValorantMatchmakingData {
    QueueID: string;
    IsRanked: boolean;
}

export interface ValorantCoreGame {
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
    ConnectionDetails: ValorantConnectionDetails;
    PostGameDetails?: any;
    Players: ValorantPlayer[];
    MatchmakingData: ValorantMatchmakingData;
}
