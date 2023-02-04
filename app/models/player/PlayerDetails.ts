import { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { PlayerStatistic } from '~/models/player/PlayerStatistic';
import { MatchHistory } from '~/models/match/MatchHistory';
import { ValorantMediaCharacter } from '~/models/interfaces/valorant-media/ValorantMediaCharacter';
import { ValorantNameService } from '~/models/interfaces/valorant-ingame/ValorantNameService';
import { ValorantCoreGamePlayer } from '~/models/interfaces/valorant-ingame/ValorantCoreGame';
import { ValorantPlayer } from '~/models/interfaces/valorant-ingame/ValorantPreGame';

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
    currentMatchDetails: ValorantCoreGamePlayer | ValorantPlayer;

    constructor(
        details: PlayerDetails,
        matchHistory: MatchHistory,
        competitiveUpdate: ValorantCompetitiveUpdate,
        statistics: PlayerStatistic,
        character: ValorantMediaCharacter,
        currentMatchDetails: ValorantCoreGamePlayer | ValorantPlayer
    ) {
        super(details, matchHistory, competitiveUpdate, statistics);
        this.character = character;
        this.currentMatchDetails = currentMatchDetails;
    }
}
