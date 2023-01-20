import type {
    ValorantMatchDetails,
    ValorantTeam,
} from '~/models/interfaces/valorant-ingame/ValorantMatchDetails';
import type { ValorantMediaMap } from '~/models/interfaces/valorant-media/ValorantMediaMap';

export class Match {
    details: ValorantMatchDetails;
    map: ValorantMediaMap;
    playerTeam: ValorantTeam;


    constructor(details: ValorantMatchDetails, map: ValorantMediaMap, playerTeam: ValorantTeam) {
        this.details = details;
        this.map = map;
        this.playerTeam = playerTeam;
    }
}
