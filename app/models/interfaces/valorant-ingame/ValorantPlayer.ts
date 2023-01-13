import { MatchId } from '~/models/interfaces/valorant-ingame/ValorantPreGame';

export type Puuid = string;
export interface ValorantPlayerResponse {
    Subject: Puuid;
    MatchID: MatchId;
    Version: number;
}
