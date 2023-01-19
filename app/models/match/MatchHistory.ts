import { Match } from '~/models/match/Match';

export class MatchHistory {
    matches: Match[];

    constructor(matches: Match[]) {
        this.matches = matches;
    }
}
