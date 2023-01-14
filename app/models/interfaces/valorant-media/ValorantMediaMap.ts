interface Location {
    x: number;
    y: number;
}

interface Callout {
    regionName: string;
    superRegionName: string;
    location: Location;
}

export interface ValorantMediaMap {
    uuid: string;
    displayName: string;
    coordinates: string;
    displayIcon: string;
    listViewIcon: string;
    splash: string;
    assetPath: string;
    mapUrl: string;
    xMultiplier: number;
    yMultiplier: number;
    xScalarToAdd: number;
    yScalarToAdd: number;
    callouts: Callout[];
}
