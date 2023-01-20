import { Match } from '~/models/match/Match';

export class MatchHistory {
    matches: Match[];

    constructor(matches?: Match[]) {
        if (matches) {
            this.matches = matches;
        }
    }

    addMatch(match: Match) {
        this.matches.push(match);
    }
}
