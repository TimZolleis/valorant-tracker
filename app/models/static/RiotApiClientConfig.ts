import { GeneralValorantMediaApi } from '~/utils/api/valorant-media/ValorantMediaCommonApiClient';

interface ClientPlatform {
    platformType: string;
    platformOS: string;
    platformOSVersion: string;
    platformChipset: string;
}

export class RiotApiClientConfig {
    clientPlatform: ClientPlatform;
    clientVersion: string;

    async init() {
        this.clientVersion = await this.fetchVersion();
        this.clientPlatform = this.fetchClientPlatform();
        return this;
    }

    private async fetchVersion() {
        const version = await new GeneralValorantMediaApi().getVersion();
        return version.riotClientVersion;
    }
    private fetchClientPlatform() {
        return {
            platformType: 'PC',
            platformOS: 'Windows',
            platformOSVersion: '10.0.19042.1.256.64bit',
            platformChipset: 'Unknown',
        };
    }
    getClientPlatform() {
        return btoa(JSON.stringify(this.clientPlatform));
    }
    getClientVersion() {
        return this.clientVersion;
    }
    getHeaders() {
        return {
            'X-Riot-ClientPlatform': this.getClientPlatform(),
            'X-Riot-ClientVersion': this.getClientVersion(),
        };
    }
}
