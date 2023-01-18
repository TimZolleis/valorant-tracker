import type { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import type { ValorantMatchDetails } from '~/models/interfaces/valorant-ingame/ValorantMatchDetails';
import { ValorantMediaContentApiClient } from '~/utils/api/valorant-media/ValorantMediaContentApiClient';

export function determinePlayerTeam(puuid: Puuid, matchDetails: ValorantMatchDetails) {
    const teamId = matchDetails.players.find((player) => {
        return player.subject === puuid;
    })?.teamId;
    return matchDetails.teams.find((team) => {
        return team.teamId === teamId;
    });
}
