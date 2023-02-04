import { ValorantPreGame } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { PlayerInMatch } from '~/models/player/PlayerDetails';
import { ValorantMediaMap } from '~/models/interfaces/valorant-media/ValorantMediaMap';
import { ValorantCoreGame } from '~/models/interfaces/valorant-ingame/ValorantCoreGame';

export class CoreGameMatch {
    matchDetails: ValorantCoreGame;
    players: PlayerInMatch[];
    map: ValorantMediaMap;
    constructor(matchDetails: ValorantCoreGame, players: PlayerInMatch[], map: ValorantMediaMap) {
        this.matchDetails = matchDetails;
        this.players = players;
        this.map = map;
    }
}
