import { AxiosInstance } from 'axios';
import { Region } from '~/models/static/Region';
import { ValorantUser } from '~/models/user/ValorantUser';
import { AccessToken } from '~/models/interfaces/AccessToken';
import { Entitlement } from '~/models/interfaces/Entitlement';
import axios from 'axios';
import {
    getAuthorizationHeader,
    getDefaultHeaders,
    getEntitlementsHeader,
} from '~/utils/axios/axios.server';

export class ValorantApiClient {
    axios: AxiosInstance;
    user: ValorantUser;
    constructor(user: ValorantUser) {
        this.axios = this.getAxiosClient(user.accessToken, user.entitlement);
        this.user = user;
    }
    private getAxiosClient(accessToken: AccessToken, entitlementsToken: Entitlement) {
        return axios.create({
            headers: {
                ...getDefaultHeaders(),
                ...getAuthorizationHeader(accessToken),
                ...getEntitlementsHeader(entitlementsToken),
            },
        });
    }

    async get(url: string) {
        return await this.axios.get(url).then((res) => res.data);
    }

    async post(url: string, body: Object) {
        return await this.axios.post(url, body).then((res) => res.data);
    }
}
