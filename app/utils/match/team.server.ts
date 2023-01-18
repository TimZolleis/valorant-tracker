import { ValorantMatchDetails } from '~/models/interfaces/valorant-ingame/ValorantMatchDetails';
import { ValorantMediaContentApiClient } from '~/utils/api/valorant-media/ValorantMediaContentApiClient';

export async function getMatchMap(matchDetails: ValorantMatchDetails) {
    const maps = await new ValorantMediaContentApiClient().getMaps();
    return maps.find((map) => {
        return map.mapUrl === matchDetails.matchInfo.mapId;
    });
}
