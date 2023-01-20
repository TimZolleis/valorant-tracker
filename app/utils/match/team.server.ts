import { ValorantMatchDetails } from '~/models/interfaces/valorant-ingame/ValorantMatchDetails';
import { ValorantMediaContentApiClient } from '~/utils/api/valorant-media/ValorantMediaContentApiClient';
import { MatchMapNotFoundException } from '~/models/exception/match/MatchMapNotFoundException';

export async function getMatchMap(matchDetails: ValorantMatchDetails) {
    const maps = await new ValorantMediaContentApiClient().getMaps();
    const map = maps.find((map) => {
        return map.mapUrl === matchDetails.matchInfo.mapId;
    });
    if (!map) {
        throw new MatchMapNotFoundException();
    }
    return map;
}
