import { ValorantMediaApiClient } from '~/utils/api/valorant-media/ValorantMediaApiClient';
import type { ValorantMediaCompetitiveSeason } from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveSeason';
import type { ValorantMediaCompetitiveTier } from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveTier';

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
        return seasons.find((competitiveSeason) => {
            return competitiveSeason.seasonUuid === activeSeasonUuid;
        });
    }
    async getCompetitiveTiers(
        competitiveSeason: ValorantMediaCompetitiveSeason
    ): Promise<ValorantMediaCompetitiveTier> {
        return await this.client.get(
            MEDIA_CONTENT_ENDPOINTS.COMPETITIVE_TIER_BY_UUID(competitiveSeason.competitiveTiersUuid)
        );
    }
}

const MEDIA_CONTENT_ENDPOINTS = {
    COMPETITIVE_SEASONS: '/seasons/competitive',
    COMPETITIVE_TIERS: '/competitivetiers',
    COMPETITIVE_TIER_BY_UUID: (uuid: string) => `/competitivetiers/${uuid}`,
};
