import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import type {
    AuthenticationTokens,
    Entitlement,
} from '~/models/interfaces/authentication/AuthenticationTokens';
import {
    getAuthorizationHeader,
    getDefaultHeaders,
    getEntitlementsHeader,
} from '~/utils/axios/axios.server';
import { redirect } from '@remix-run/node';

export class ValorantGameApiClient {
    axios: AxiosInstance;
    user: AuthenticatedValorantUser;

    constructor(user: AuthenticatedValorantUser, extraHeaders = {}) {
        this.axios = this.getAxiosClient(user.accessToken, user.entitlement, extraHeaders);
        this.user = user;
    }

    private getAxiosClient(
        accessToken: AuthenticationTokens,
        entitlementsToken: Entitlement,
        extraHeaders: {}
    ) {
        return axios.create({
            headers: {
                ...getDefaultHeaders(),
                ...getAuthorizationHeader(accessToken),
                ...getEntitlementsHeader(entitlementsToken),
                ...extraHeaders,
            },
        });
    }

    async get(url: string) {
        return await this.axios
            .get(url)
            .then((res) => res.data)
            .catch((error) => {
                return redirect('/reauth');
            });
    }

    async post(url: string, body: Object) {
        return await this.axios
            .post(url, body)
            .then((res) => res.data)
            .catch((error) => {
                return redirect('/reauth');
            });
    }
}
