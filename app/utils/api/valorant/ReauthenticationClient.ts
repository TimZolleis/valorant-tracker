import type { AxiosInstance } from 'axios';
import { CookieJar } from 'tough-cookie';
import { getAuthorizationHeader, getLoginClient } from '~/utils/axios/axios.server';
import { ENDPOINTS } from '~/models/static/Endpoints';
import { parseTokenData } from '~/utils/token/riotToken.server';
import { InvalidCredentialsException } from '~/models/exception/login/InvalidCredentialsException';
import type { AccessToken } from '~/models/interfaces/AccessToken';
import { ReauthenticationCookies } from '~/models/cookies/ReauthenticationCookies';
import type { RSOUserInfo } from '~/models/interfaces/RSOUserInfo';
import { ValorantUser } from '~/models/user/ValorantUser';
import { InvalidAccessTokenException } from '~/models/exception/login/InvalidAccessTokenException';
import { Cookie } from 'tough-cookie';
import { Entitlement } from '~/models/interfaces/Entitlement';
import { updateSession } from '~/utils/session/session.server';

export class AuthenticationClient {
    client: AxiosInstance;
    user: ValorantUser;
    jar: CookieJar;

    async init(user: ValorantUser) {
        const jar = await this.getReauthenticationCookieJar(user);
        const { cookieJar, client } = getLoginClient(jar);
        this.jar = cookieJar;
        this.client = client;
        return this;
    }

    private async getReauthenticationCookieJar(user: ValorantUser) {
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

    private parseCookie(cookieString: string) {
        return Cookie.parse(cookieString);
    }

    private async requestAccessToken() {
        return await this.client
            .get(ENDPOINTS.REAUTH)
            .then((response) => {
                return parseTokenData(response.request.res.responseUrl);
            })
            .catch((error) => {
                return parseTokenData(error.response.request.res.responseUrl);
            });
    }

    private async requestEntitlementsToken(accessToken: AccessToken) {
        return await this.client
            .post(
                `${ENDPOINTS.ENTITLEMENTS}/api/token/v1`,
                {},
                { headers: { ...getAuthorizationHeader(accessToken) } }
            )
            .then((response) => response.data.entitlements_token)
            .catch((error) => {
                throw new InvalidAccessTokenException();
            });
    }

    private async requestUserData(accessToken: AccessToken): Promise<RSOUserInfo> {
        return await this.client
            .get(`${ENDPOINTS.AUTH}/userinfo`, {
                headers: {
                    ...getAuthorizationHeader(accessToken),
                },
            })
            .then((response) => response.data)
            .catch((error) => {
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
        return this;
    }

    async refreshLoginSession(request: Request, redirectUrl: string) {
        return await updateSession(request, this.user, redirectUrl);
    }
}
const AUTHORIZATION_BODY = {
    client_id: 'play-valorant-web-prod',
    nonce: 1,
    redirect_uri: 'https://playvalorant.com/opt_in',
    response_type: 'token id_token',
    scope: 'account openid',
};
