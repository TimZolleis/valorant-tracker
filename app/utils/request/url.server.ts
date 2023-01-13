import { ENDPOINTS } from '~/models/static/Endpoints';
import type { PlayerRegion } from '~/models/static/PlayerRegion';

export class UrlBuilder {
    private readonly region: PlayerRegion;

    constructor(region: PlayerRegion) {
        this.region = region;
    }

    buildMatchUrl(endpoint: string) {
        return `${ENDPOINTS.PARTY(this.region)}/${endpoint}`;
    }
    buildBaseUrl(endpoint: string) {
        return `${ENDPOINTS.BASE(this.region)}/${endpoint}`;
    }
    buildSharedUrl(endpoint: string) {
        return `${ENDPOINTS.SHARED(this.region)}/${endpoint}`;
    }
}
