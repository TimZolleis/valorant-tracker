import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { ValorantUser } from '~/models/user/ValorantUser';
import type { AccessToken } from '~/models/interfaces/AccessToken';
import type { Entitlement } from '~/models/interfaces/Entitlement';
import {
    getAuthorizationHeader,
    getDefaultHeaders,
    getEntitlementsHeader,
} from '~/utils/axios/axios.server';
import { redirect } from '@remix-run/node';

export class ValorantApiClient {
    axios: AxiosInstance;
    user: ValorantUser;

    constructor(user: ValorantUser, extraHeaders = {}) {
        this.axios = this.getAxiosClient(user.accessToken, user.entitlement, extraHeaders);
        this.user = user;
    }

    private getAxiosClient(
        accessToken: AccessToken,
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
