import {ENDPOINTS} from "~/models/static/Endpoints";
import type {Region} from "~/models/static/Region";


export class UrlBuilder {
    private readonly region: Region;

    constructor(region: Region) {
        this.region = region;
    }

    buildMatchUrl(endpoint: string) {
        return `${ENDPOINTS.PARTY(this.region)}/${endpoint}`
    }

}