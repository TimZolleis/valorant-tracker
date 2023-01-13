export interface ValorantSeason {
    ID: string;
    Name: string;
    Type: string;
    StartTime: Date;
    EndTime: Date;
    IsActive: boolean;
}

export interface ValorantEvent {
    ID: string;
    Name: string;
    StartTime: Date;
    EndTime: Date;
    IsActive: boolean;
}

export interface ValorantContent {
    DisabledIDs: any[];
    Seasons: ValorantSeason[];
    Events: ValorantEvent[];
}
