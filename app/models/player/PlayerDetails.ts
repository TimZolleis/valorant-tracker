import { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { PlayerStatistic } from '~/models/player/PlayerStatistic';
import { MatchHistory } from '~/models/match/MatchHistory';
import { ValorantMediaCharacter } from '~/models/interfaces/valorant-media/ValorantMediaCharacter';
import { ValorantPlayer } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { ValorantNameService } from '~/models/interfaces/valorant-ingame/ValorantNameService';

export class Player {
    details: PlayerDetails;
    matchHistory: MatchHistory;
    competitiveUpdate: ValorantCompetitiveUpdate;
    statistics: PlayerStatistic;

    constructor(
        details: PlayerDetails,
        matchHistory: MatchHistory,
        competitiveUpdate: ValorantCompetitiveUpdate,
        statistics: PlayerStatistic
    ) {
        this.details = details;
        this.matchHistory = matchHistory;
        this.competitiveUpdate = competitiveUpdate;
        this.statistics = statistics;
    }
}

export class PlayerDetails {
    nameService: ValorantNameService;
    constructor(nameService: ValorantNameService) {
        this.nameService = nameService;
    }
}

export class PlayerInMatch extends Player {
    character?: ValorantMediaCharacter;
    currentMatchDetails: ValorantPlayer;

    constructor(
        details: PlayerDetails,
        matchHistory: MatchHistory,
        competitiveUpdate: ValorantCompetitiveUpdate,
        statistics: PlayerStatistic,
        character: ValorantMediaCharacter,
        currentMatchDetails: ValorantPlayer
    ) {
        super(details, matchHistory, competitiveUpdate, statistics);
        this.character = character;
        this.currentMatchDetails = currentMatchDetails;
    }
}
