import {MatchId} from "~/models/interfaces/PregameMatch";

export type Puuid = string;
export interface PlayerResponse {
    Subject: Puuid;
    MatchID: MatchId
    Version: number;
}