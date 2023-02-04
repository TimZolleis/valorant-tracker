import type { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import type { ValorantMatchDetails } from '~/models/interfaces/valorant-ingame/ValorantMatchDetails';
import { ValorantMediaContentApiClient } from '~/utils/api/valorant-media/ValorantMediaContentApiClient';
import { MatchMapNotFoundException } from '~/models/exception/match/MatchMapNotFoundException';
import { ServerRegions } from '~/models/static/ServerRegions';

export function determinePlayerTeam(puuid: Puuid, matchDetails: ValorantMatchDetails) {
    const teamId = matchDetails.players.find((player) => {
        return player.subject === puuid;
    })?.teamId;
    return matchDetails.teams.find((team) => {
        return team.teamId === teamId;
    });
}

export async function getMatchMap(mapId: string) {
    const maps = await new ValorantMediaContentApiClient().getMaps();
    const map = maps.find((map) => {
        return map.mapUrl === mapId;
    });
    if (!map) {
        throw new MatchMapNotFoundException();
    }
    return map;
}
