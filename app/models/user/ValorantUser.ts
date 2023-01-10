import { Region } from '~/models/static/Region';
import { AccessToken } from '~/models/interfaces/AccessToken';
import { Entitlement } from '~/models/interfaces/Entitlement';
import { Puuid } from '~/models/interfaces/Player';
import { ReauthenticationCookies } from '~/models/cookies/ReauthenticationCookies';

export class ValorantUser {
    username: string;
    displayName: string;
    accessToken: AccessToken;
    reauthenticationCookies: ReauthenticationCookies;
    entitlement: Entitlement;
    region: Region;
    puuid: Puuid;

    constructor(
        username: string,
        displayName: string,
        accessToken: AccessToken,
        reauthenticationCookies: ReauthenticationCookies,
        entitlement: Entitlement,
        region: Region,
        puuid: Puuid
    ) {
        this.username = username;
        this.displayName = displayName;
        this.accessToken = accessToken;
        this.reauthenticationCookies = reauthenticationCookies;
        this.entitlement = entitlement;
        this.region = region;
        this.puuid = puuid;
    }

    async authorize() {}
}
