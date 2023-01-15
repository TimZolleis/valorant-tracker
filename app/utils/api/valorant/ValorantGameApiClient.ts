import type { AxiosInstance, AxiosRequestConfig } from 'axios';
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
import { RiotServicesUnavailableException } from '~/models/exception/riot/RiotServicesUnavailableException';
import { RiotRequest } from '~/utils/request/url.server';
import { RiotApiClientConfig } from '~/models/static/RiotApiClientConfig';
import { clientConfig } from '~/config/clientConfig';

export class ValorantGameApiClient {
    axios: AxiosInstance;
    user: AuthenticatedValorantUser;

    constructor(user: AuthenticatedValorantUser, extraHeaders = {}) {
        const config = new RiotApiClientConfig(
            clientConfig.clientPlatform,
            clientConfig.clientVersion
        );
        this.axios = this.getAxiosClient(user.accessToken, user.entitlement, {
            ...config.getHeaders(),
            ...extraHeaders,
        });
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

    async get(request: RiotRequest, config?: AxiosRequestConfig<any>) {
        return await this.axios
            .get(request.getUrl(), config)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response?.status === 400) {
                    throw redirect('/reauth');
                }

                if (error.response?.status >= 500) {
                    this.getFallback(request, config);
                } else {
                    console.log(error);
                    throw new Error(error.message);
                }
            });
    }

    async post(request: RiotRequest, body: Object, config?: AxiosRequestConfig<any>) {
        return await this.axios
            .post(request.getUrl(), body)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response?.status === 400) {
                    throw redirect('/reauth');
                }

                if (error.response?.status >= 500) {
                    this.postFallback(request, body, config);
                } else {
                    throw new Error(error.message);
                }
            });
    }

    async getFallback(request: RiotRequest, config?: AxiosRequestConfig<any>) {
        const fallbackUrl = request.getFallback();
        console.log('FallbackURL:', fallbackUrl.getUrl());
        return await this.axios
            .get(fallbackUrl.getUrl(), config)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response?.status === 400) {
                    throw redirect('/reauth');
                }

                if (error.response?.status >= 500) {
                    this.getFallback(request, config);
                }
                throw new RiotServicesUnavailableException();
            });
    }

    async postFallback(request: RiotRequest, body: Object, config?: AxiosRequestConfig<any>) {
        const fallbackUrl = request.setRegion('na');
        return await this.axios
            .post(fallbackUrl.getUrl(), body, config)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response?.status === 400) {
                    throw redirect('/reauth');
                }

                if (error.response?.status >= 500) {
                    this.postFallback(request, body, config);
                }
                throw new RiotServicesUnavailableException();
            });
    }
}
