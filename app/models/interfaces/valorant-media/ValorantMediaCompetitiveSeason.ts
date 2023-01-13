interface Border {
    uuid: string;
    level: number;
    winsRequired: number;
    displayIcon: string;
    smallIcon: string;
    assetPath: string;
}

export interface ValorantMediaCompetitiveSeason {
    uuid: string;
    startTime: Date;
    endTime: Date;
    seasonUuid: string;
    competitiveTiersUuid: string;
    borders: Border[];
    assetPath: string;
}
