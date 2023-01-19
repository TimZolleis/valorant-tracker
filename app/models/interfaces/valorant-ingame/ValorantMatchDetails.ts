export type MatchId = string;

interface PartyRRPenalties {
    [key: string]: number;
}

interface ValorantMatchInfo {
    matchId: string;
    mapId: string;
    gamePodId: string;
    gameLoopZone: string;
    gameServerAddress: string;
    gameVersion: string;
    gameLengthMillis: number;
    gameStartMillis: number;
    provisioningFlowID: string;
    isCompleted: boolean;
    customGameName: string;
    forcePostProcessing: boolean;
    queueID: string;
    gameMode: string;
    isRanked: boolean;
    isMatchSampled: boolean;
    seasonId: string;
    completionState: string;
    platformType: string;
    partyRRPenalties: PartyRRPenalties;
    shouldMatchDisablePenalties: boolean;
}

interface ValorantPlatformInfo {
    platformType: string;
    platformOS: string;
    platformOSVersion: string;
    platformChipset: string;
}

interface ValorantAbilityCasts {
    grenadeCasts: number;
    ability1Casts: number;
    ability2Casts: number;
    ultimateCasts: number;
}

interface ValorantStats {
    score: number;
    roundsPlayed: number;
    kills: number;
    deaths: number;
    assists: number;
    playtimeMillis: number;
    abilityCasts: ValorantAbilityCasts;
}

interface ValorantRoundDamage {
    round: number;
    receiver: string;
    damage: number;
}

interface ValorantBehaviorFactors {
    afkRounds: number;
    collisions: number;
    damageParticipationOutgoing: number;
    friendlyFireIncoming: number;
    friendlyFireOutgoing: number;
    mouseMovement: number;
    stayedInSpawnRounds: number;
}

interface ValorantBasicMovement {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

interface ValorantBasicGunSkill {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

interface ValorantAdaptiveBots {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
    adaptiveBotAverageDurationMillisAllAttempts: number;
    adaptiveBotAverageDurationMillisFirstAttempt: number;
    killDetailsFirstAttempt?: any;
}

interface ValorantAbility {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

interface ValorantBombPlant {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

interface ValorantDefendBombSite {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
    success: boolean;
}

interface ValorantSettingStatus {
    isMouseSensitivityDefault: boolean;
    isCrosshairDefault: boolean;
}

interface ValorantNewPlayerExperienceDetails {
    basicMovement: ValorantBasicMovement;
    basicGunSkill: ValorantBasicGunSkill;
    adaptiveBots: ValorantAdaptiveBots;
    ability: ValorantAbility;
    bombPlant: ValorantBombPlant;
    defendBombSite: ValorantDefendBombSite;
    settingStatus: ValorantSettingStatus;
}

interface ValorantXpModification {
    Value: number;
    ID: string;
}

interface ValorantPlayer {
    subject: string;
    gameName: string;
    tagLine: string;
    platformInfo: ValorantPlatformInfo;
    teamId: string;
    partyId: string;
    characterId: string;
    stats: ValorantStats;
    roundDamage: ValorantRoundDamage[];
    competitiveTier: number;
    playerCard: string;
    playerTitle: string;
    preferredLevelBorder: string;
    accountLevel: number;
    sessionPlaytimeMinutes: number;
    behaviorFactors: ValorantBehaviorFactors;
    newPlayerExperienceDetails: ValorantNewPlayerExperienceDetails;
    xpModifications: ValorantXpModification[];
}

export interface ValorantTeam {
    teamId: string;
    won: boolean;
    roundsPlayed: number;
    roundsWon: number;
    numPoints: number;
}

interface ValorantLocation {
    x: number;
    y: number;
}

interface ValorantPlantPlayerLocation {
    subject: string;
    viewRadians: number;
    location: ValorantLocation;
}

interface ValorantPlantLocation {
    x: number;
    y: number;
}

interface ValorantDefusePlayerLocation {
    subject: string;
    viewRadians: number;
    location: ValorantLocation;
}

interface ValorantDefuseLocation {
    x: number;
    y: number;
}

interface ValorantVictimLocation {
    x: number;
    y: number;
}
interface ValorantPlayerLocation {
    subject: string;
    viewRadians: number;
    location: ValorantLocation;
}

interface ValorantFinishingDamage {
    damageType: string;
    damageItem: string;
    isSecondaryFireMode: boolean;
}

interface ValorantKill {
    gameTime: number;
    roundTime: number;
    killer: string;
    victim: string;
    victimLocation: ValorantVictimLocation;
    assistants: string[];
    playerLocations: ValorantPlayerLocation[];
    finishingDamage: ValorantFinishingDamage;
}

interface ValorantDamage {
    receiver: string;
    damage: number;
    legshots: number;
    bodyshots: number;
    headshots: number;
}

interface ValorantEconomy {
    loadoutValue: number;
    weapon: string;
    armor: string;
    remaining: number;
    spent: number;
}
interface ValorantPlayerStat {
    subject: string;
    kills: ValorantKill[];
    damage: ValorantDamage[];
    score: number;
    economy: ValorantEconomy;
    ability: ValorantAbility;
    wasAfk: boolean;
    wasPenalized: boolean;
    stayedInSpawn: boolean;
}

interface ValorantPlayerEconomy {
    subject: string;
    loadoutValue: number;
    weapon: string;
    armor: string;
    remaining: number;
    spent: number;
}

interface ValorantPlayerScore {
    subject: string;
    score: number;
}

interface ValorantRoundResult {
    roundNum: number;
    roundResult: string;
    roundCeremony: string;
    winningTeam: string;
    bombPlanter: string;
    plantRoundTime: number;
    plantPlayerLocations: ValorantPlantPlayerLocation[];
    plantLocation: ValorantPlantLocation;
    plantSite: string;
    defuseRoundTime: number;
    defusePlayerLocations: ValorantDefusePlayerLocation[];
    defuseLocation: ValorantDefuseLocation;
    playerStats: ValorantPlayerStat[];
    roundResultCode: string;
    playerEconomies: ValorantPlayerEconomy[];
    playerScores: ValorantPlayerScore[];
    bombDefuser: string;
}
export interface ValorantMatchDetails {
    matchInfo: ValorantMatchInfo;
    players: ValorantPlayer[];
    bots: any[];
    coaches: any[];
    teams: ValorantTeam[];
    roundResults: ValorantRoundResult[];
    kills: ValorantKill[];
}
