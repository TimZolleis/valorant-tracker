import { MediaApiClient } from '~/utils/api/valorant-media/MediaApiClient';
import type { MediaCompetitiveSeasonResponse } from '~/models/interfaces/MediaApiCompetitiveSeasonsResponse';
import type { MediaCompetitiveTierResponse } from '~/models/interfaces/MediaApiCompetitiveTierResponse';

export class ContentMediaApi {
    client: MediaApiClient;

    constructor() {
        this.client = new MediaApiClient();
    }

    async getCompetitiveSeasons(): Promise<MediaCompetitiveSeasonResponse[]> {
        return await this.client.get(MEDIA_CONTENT_ENDPOINTS.COMPETITIVE_SEASONS);
    }

    async getCurrentCompetitiveSeason(activeSeasonUuid: string) {
        const seasons = await this.getCompetitiveSeasons();
        return seasons.find((competitiveSeason) => {
            return competitiveSeason.seasonUuid === activeSeasonUuid;
        });
    }
    async getCompetitiveTiers(
        competitiveSeason: MediaCompetitiveSeasonResponse
    ): Promise<MediaCompetitiveTierResponse> {
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
