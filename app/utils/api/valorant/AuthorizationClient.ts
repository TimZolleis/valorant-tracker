import type { AxiosInstance } from 'axios';
import type { CookieJar } from 'tough-cookie';
import { getAuthorizationHeader, getLoginClient } from '~/utils/axios/axios.server';
import { ENDPOINTS } from '~/models/static/Endpoints';
import { parseTokenData } from '~/utils/token/riotToken.server';
import { InvalidCredentialsException } from '~/models/exception/login/InvalidCredentialsException';
import type { AccessToken } from '~/models/interfaces/AccessToken';
import { ReauthenticationCookies } from '~/models/cookies/ReauthenticationCookies';
import type { RSOUserInfo } from '~/models/interfaces/RSOUserInfo';
import { ValorantUser } from '~/models/user/ValorantUser';
import { InvalidAccessTokenException } from '~/models/exception/login/InvalidAccessTokenException';

export class AuthorizationClient {
    client: AxiosInstance;
    jar: CookieJar;

    constructor() {
        const { cookieJar, client } = getLoginClient();
        this.jar = cookieJar;
        this.client = client;
    }

    async authorize(username: string, password: string) {
        await this.requestCookies();
        const { idToken, accessToken } = await this.requestAccessToken(username, password);
        const entitlementsToken = await this.requestEntitlementsToken(accessToken);
        const reauthenticationCookies = await new ReauthenticationCookies().init(this.jar);
        const userData = await this.requestUserData(accessToken);
        return new ValorantUser(
            username,
            userData.acct.game_name,
            accessToken,
            reauthenticationCookies,
            entitlementsToken,
            userData.affinity.pp,
            userData.sub
        );
    }

    private async requestCookies() {
        return await this.client
            .post(`${ENDPOINTS.AUTH}/api/v1/authorization`, {
                ...AUTHORIZATION_BODY,
            })
            .catch((error) => {
                console.log('Auth Cookie error', error.response);
            });
    }

    private async requestAccessToken(username: string, password: string) {
        return await this.client
            .put(`${ENDPOINTS.AUTH}/api/v1/authorization`, {
                type: 'auth',
                username: username,
                password: password,
                remember: true,
                language: 'en_US',
            })
            .then((response) => {
                return parseTokenData(response.data.response.parameters.uri);
            })
            .catch((error) => {
                throw new InvalidCredentialsException();
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
}

const AUTHORIZATION_BODY = {
    client_id: 'play-valorant-web-prod',
    nonce: 1,
    redirect_uri: 'https://playvalorant.com/opt_in',
    response_type: 'token id_token',
    scope: 'account openid',
};
