import { ValorantMediaApiClient } from '~/utils/api/valorant-media/ValorantMediaApiClient';
import type { ValorantMediaCompetitiveSeason } from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveSeason';
import type { ValorantMediaCompetitiveTier } from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveTier';
import { ActiveSeason } from '~/utils/api/valorant/ValorantContentApiClient';

export class ValorantMediaContentApiClient {
    client: ValorantMediaApiClient;

    constructor() {
        this.client = new ValorantMediaApiClient();
    }

    async getCompetitiveSeasons(): Promise<ValorantMediaCompetitiveSeason[]> {
        return await this.client.get(MEDIA_CONTENT_ENDPOINTS.COMPETITIVE_SEASONS);
    }

    async getCurrentCompetitiveSeason(activeSeasonUuid: string) {
        const seasons = await this.getCompetitiveSeasons();
        const found = seasons.find((competitiveSeason) => {
            return competitiveSeason.seasonUuid === activeSeasonUuid;
        });
        console.log(found);
        return found;
    }
    async getCompetitiveTiers(
        competitiveSeason: ValorantMediaCompetitiveSeason
    ): Promise<ValorantMediaCompetitiveTier> {
        return await this.client.get(
            MEDIA_CONTENT_ENDPOINTS.COMPETITIVE_TIER_BY_UUID(competitiveSeason.competitiveTiersUuid)
        );
    }

    async getCurrentCompetitiveTiers(activeSeason: ActiveSeason) {
        return await this.getCurrentCompetitiveSeason(activeSeason.act.ID).then(
            async (competitiveSeason) => {
                console.log(competitiveSeason?.competitiveTiersUuid);
                return await this.getCompetitiveTiers(competitiveSeason!);
            }
        );
    }
}

const MEDIA_CONTENT_ENDPOINTS = {
    COMPETITIVE_SEASONS: '/seasons/competitive',
    COMPETITIVE_TIERS: '/competitivetiers',
    COMPETITIVE_TIER_BY_UUID: (uuid: string) => `/competitivetiers/${uuid}`,
};
