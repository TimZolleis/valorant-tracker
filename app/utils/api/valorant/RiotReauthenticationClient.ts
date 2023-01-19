import type { AxiosInstance } from 'axios';
import { CookieJar } from 'tough-cookie';
import { getAuthorizationHeader, getLoginClient } from '~/utils/axios/axios.server';
import { ENDPOINTS } from '~/models/static/Endpoints';
import { parseTokenData } from '~/utils/token/riotToken.server';
import type { AuthenticationTokens } from '~/models/interfaces/authentication/AuthenticationTokens';
import { ReauthenticationCookies } from '~/models/cookies/ReauthenticationCookies';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import { InvalidAccessTokenException } from '~/models/exception/login/InvalidAccessTokenException';
import { updateSession } from '~/utils/session/session.server';
import { redirect } from '@remix-run/node';

export class RiotReauthenticationClient {
    client: AxiosInstance;
    user: AuthenticatedValorantUser;
    jar: CookieJar;

    async init(user: AuthenticatedValorantUser) {
        const jar = await this.getReauthenticationCookieJar(user);
        const { cookieJar, client } = getLoginClient(jar);
        this.user = user;
        this.jar = cookieJar;
        this.client = client;
        return this;
    }

    private async getReauthenticationCookieJar(user: AuthenticatedValorantUser) {
        const jar = new CookieJar();
        const domain = ENDPOINTS.AUTH;
        await Promise.all([
            jar.setCookie(user.reauthenticationCookies.sub, domain),
            jar.setCookie(user.reauthenticationCookies.csid, domain),
            jar.setCookie(user.reauthenticationCookies.clid, domain),
            jar.setCookie(user.reauthenticationCookies.ssid, domain),
        ]);
        return jar;
    }

    private async requestAccessToken() {
        return await this.client
            .get(ENDPOINTS.REAUTH)
            .then((response) => {
                return parseTokenData(response.request.res.responseUrl);
            })
            .catch((error) => {
                try {
                    return parseTokenData(error.response.request.res.responseUrl);
                } catch (error) {
                    throw redirect('/login');
                }
            });
    }

    private async requestEntitlementsToken(accessToken: AuthenticationTokens) {
        return await this.client
            .post(
                `${ENDPOINTS.ENTITLEMENTS}/api/token/v1`,
                {},
                { headers: { ...getAuthorizationHeader(accessToken) } }
            )
            .then((response) => response.data.entitlements_token)
            .catch(() => {
                throw new InvalidAccessTokenException();
            });
    }

    async reauthenticate() {
        const { accessToken } = await this.requestAccessToken();
        const entitlement = await this.requestEntitlementsToken(accessToken);
        const reauthenticationCookies = await new ReauthenticationCookies().init(this.jar);
        this.user.accessToken = accessToken;
        this.user.entitlement = entitlement;
        this.user.reauthenticationCookies = reauthenticationCookies;
        return this.user;
    }

    async refreshLoginSession(request: Request) {
        return await updateSession(request, this.user);
    }
}
