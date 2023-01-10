export interface Season {
    ID: string;
    Name: string;
    Type: string;
    StartTime: Date;
    EndTime: Date;
    IsActive: boolean;
}

export interface Event {
    ID: string;
    Name: string;
    StartTime: Date;
    EndTime: Date;
    IsActive: boolean;
}

export interface Content {
    DisabledIDs: any[];
    Seasons: Season[];
    Events: Event[];
}


