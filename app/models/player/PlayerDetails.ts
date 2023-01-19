import { MatchHistory } from '~/models/match/MatchHistory';
import { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { PlayerStatistics } from '~/models/player/PlayerStatistics';

export class Player {
    details:
    matchHistory: MatchHistory;
    competitiveUpdate: ValorantCompetitiveUpdate;
    statistics: PlayerStatistics;
}

class PlayerDetails {
    nameService: string



}

