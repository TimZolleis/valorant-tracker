import { ValorantPreGame } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { Player, PlayerInMatch } from '~/models/player/PlayerDetails';
import { ValorantMediaMap } from '~/models/interfaces/valorant-media/ValorantMediaMap';

export class PreGameMatch {
    matchDetails: ValorantPreGame;
    players: PlayerInMatch[];
    map: ValorantMediaMap;
    constructor(matchDetails: ValorantPreGame, players: PlayerInMatch[], map: ValorantMediaMap) {
        this.matchDetails = matchDetails;
        this.players = players;
        this.map = map;
    }
}
