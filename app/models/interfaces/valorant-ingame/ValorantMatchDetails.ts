export type MatchId = string;

interface PartyRRPenalties {
    [key: string]: number;
}

interface MatchInfo {
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

interface PlatformInfo {
    platformType: string;
    platformOS: string;
    platformOSVersion: string;
    platformChipset: string;
}

interface AbilityCasts {
    grenadeCasts: number;
    ability1Casts: number;
    ability2Casts: number;
    ultimateCasts: number;
}

interface Stats {
    score: number;
    roundsPlayed: number;
    kills: number;
    deaths: number;
    assists: number;
    playtimeMillis: number;
    abilityCasts: AbilityCasts;
}

interface RoundDamage {
    round: number;
    receiver: string;
    damage: number;
}

interface BehaviorFactors {
    afkRounds: number;
    collisions: number;
    damageParticipationOutgoing: number;
    friendlyFireIncoming: number;
    friendlyFireOutgoing: number;
    mouseMovement: number;
    stayedInSpawnRounds: number;
}

interface BasicMovement {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

interface BasicGunSkill {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

interface AdaptiveBots {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
    adaptiveBotAverageDurationMillisAllAttempts: number;
    adaptiveBotAverageDurationMillisFirstAttempt: number;
    killDetailsFirstAttempt?: any;
}

interface Ability {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

interface BombPlant {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
}

interface DefendBombSite {
    idleTimeMillis: number;
    objectiveCompleteTimeMillis: number;
    success: boolean;
}

interface SettingStatus {
    isMouseSensitivityDefault: boolean;
    isCrosshairDefault: boolean;
}

interface NewPlayerExperienceDetails {
    basicMovement: BasicMovement;
    basicGunSkill: BasicGunSkill;
    adaptiveBots: AdaptiveBots;
    ability: Ability;
    bombPlant: BombPlant;
    defendBombSite: DefendBombSite;
    settingStatus: SettingStatus;
}

interface XpModification {
    Value: number;
    ID: string;
}

interface Player {
    subject: string;
    gameName: string;
    tagLine: string;
    platformInfo: PlatformInfo;
    teamId: string;
    partyId: string;
    characterId: string;
    stats: Stats;
    roundDamage: RoundDamage[];
    competitiveTier: number;
    playerCard: string;
    playerTitle: string;
    preferredLevelBorder: string;
    accountLevel: number;
    sessionPlaytimeMinutes: number;
    behaviorFactors: BehaviorFactors;
    newPlayerExperienceDetails: NewPlayerExperienceDetails;
    xpModifications: XpModification[];
}

export interface Team {
    teamId: string;
    won: boolean;
    roundsPlayed: number;
    roundsWon: number;
    numPoints: number;
}

interface Location {
    x: number;
    y: number;
}

interface PlantPlayerLocation {
    subject: string;
    viewRadians: number;
    location: Location;
}

interface PlantLocation {
    x: number;
    y: number;
}

interface DefusePlayerLocation {
    subject: string;
    viewRadians: number;
    location: Location;
}

interface DefuseLocation {
    x: number;
    y: number;
}

interface VictimLocation {
    x: number;
    y: number;
}
interface PlayerLocation {
    subject: string;
    viewRadians: number;
    location: Location;
}

interface FinishingDamage {
    damageType: string;
    damageItem: string;
    isSecondaryFireMode: boolean;
}

interface Kill {
    gameTime: number;
    roundTime: number;
    killer: string;
    victim: string;
    victimLocation: VictimLocation;
    assistants: string[];
    playerLocations: PlayerLocation[];
    finishingDamage: FinishingDamage;
}

interface Damage {
    receiver: string;
    damage: number;
    legshots: number;
    bodyshots: number;
    headshots: number;
}

interface Economy {
    loadoutValue: number;
    weapon: string;
    armor: string;
    remaining: number;
    spent: number;
}
interface PlayerStat {
    subject: string;
    kills: Kill[];
    damage: Damage[];
    score: number;
    economy: Economy;
    ability: Ability;
    wasAfk: boolean;
    wasPenalized: boolean;
    stayedInSpawn: boolean;
}

interface PlayerEconomy {
    subject: string;
    loadoutValue: number;
    weapon: string;
    armor: string;
    remaining: number;
    spent: number;
}

interface PlayerScore {
    subject: string;
    score: number;
}

interface RoundResult {
    roundNum: number;
    roundResult: string;
    roundCeremony: string;
    winningTeam: string;
    bombPlanter: string;
    plantRoundTime: number;
    plantPlayerLocations: PlantPlayerLocation[];
    plantLocation: PlantLocation;
    plantSite: string;
    defuseRoundTime: number;
    defusePlayerLocations: DefusePlayerLocation[];
    defuseLocation: DefuseLocation;
    playerStats: PlayerStat[];
    roundResultCode: string;
    playerEconomies: PlayerEconomy[];
    playerScores: PlayerScore[];
    bombDefuser: string;
}
export interface ValorantMatchDetails {
    matchInfo: MatchInfo;
    players: Player[];
    bots: any[];
    coaches: any[];
    teams: Team[];
    roundResults: RoundResult[];
    kills: Kill[];
}
