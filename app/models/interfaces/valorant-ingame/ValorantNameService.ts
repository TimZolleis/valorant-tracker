import { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';

export interface ValorantNameService {
    DisplayName: string;
    Subject: Puuid;
    GameName: string;
    TagLine: string;
}
