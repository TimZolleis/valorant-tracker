import type { DateTime } from 'luxon';

export interface ValorantMediaApiVersionResponse {
    manifestId: string;
    branch: string;
    version: string;
    buildVersion: string;
    engineVersion: string;
    riotClientVersion: string;
    riotClientBuild: string;
    buildDate: DateTime;
}

export interface ValorantMediaApiPlayerCardResponse {
    uuid: string;
    displayName: string;
    isHiddenIfNotOwned: boolean;
    themeUuid?: any;
    displayIcon: string;
    smallArt: string;
    wideArt: string;
    largeArt: string;
    assetPath: string;
}
