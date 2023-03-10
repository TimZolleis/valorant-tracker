interface Role {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
    assetPath: string;
}

interface Ability {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
}

interface MediaList {
    id: number;
    wwise: string;
    wave: string;
}

interface VoiceLine {
    minDuration: number;
    maxDuration: number;
    mediaList: MediaList[];
}

export interface ValorantMediaCharacter {
    uuid: string;
    displayName: string;
    description: string;
    developerName: string;
    characterTags: string[];
    displayIcon: string;
    displayIconSmall: string;
    bustPortrait: string;
    fullPortrait: string;
    fullPortraitV2: string;
    killfeedPortrait: string;
    background: string;
    backgroundGradientColors: string[];
    assetPath: string;
    isFullPortraitRightFacing: boolean;
    isPlayableCharacter: boolean;
    isAvailableForTest: boolean;
    isBaseContent: boolean;
    role: Role;
    abilities: Ability[];
    voiceLine: VoiceLine;
}
