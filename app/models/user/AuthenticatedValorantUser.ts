import { PlayerRegion } from '~/models/static/PlayerRegion';
import {
    AuthenticationTokens,
    Entitlement,
} from '~/models/interfaces/authentication/AuthenticationTokens';
import { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import { ReauthenticationCookies } from '~/models/cookies/ReauthenticationCookies';

export class AuthenticatedValorantUser {
    username: string;
    displayName: string;
    accessToken: AuthenticationTokens;
    reauthenticationCookies: ReauthenticationCookies;
    entitlement: Entitlement;
    region: PlayerRegion;
    puuid: Puuid;

    constructor(
        username: string,
        displayName: string,
        accessToken: AuthenticationTokens,
        reauthenticationCookies: ReauthenticationCookies,
        entitlement: Entitlement,
        region: PlayerRegion,
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
