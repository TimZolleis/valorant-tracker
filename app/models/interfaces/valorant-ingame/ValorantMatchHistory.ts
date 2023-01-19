interface ValorantHistory {
    MatchID: string;
    GameStartTime: any;
    QueueID: string;
}

export interface ValorantMatchHistory {
    Subject: string;
    BeginIndex: number;
    EndIndex: number;
    Total: number;
    History: ValorantHistory[];
}
