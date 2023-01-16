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
import { CacheConfig, RedisClient } from '~/utils/api/redis/RedisClient';

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

    async get(request: RiotRequest, config?: AxiosRequestConfig<any>, cacheConfig?: CacheConfig) {
        if (cacheConfig) {
            const cachedValue = await this.getCache(request.getUrl());
            if (cachedValue) {
                return JSON.parse(cachedValue);
            }
        }
        console.log('Fetchin from api', request.getUrl());
        const result = await this.axios
            .get(request.getUrl(), config)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response?.status === 400) {
                    throw redirect('/reauth');
                }
                if (error.response?.status >= 500) {
                    this.getFallback(request, config);
                } else {
                    throw new Error(error.message);
                }
            });
        if (cacheConfig) {
            console.log('Setting to cache');
            await this.setCache(request.getUrl(), JSON.stringify(result), cacheConfig);
        }

        return result;
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

    async getFallback(
        request: RiotRequest,
        config?: AxiosRequestConfig<any>,
        cacheConfig?: CacheConfig
    ) {
        const fallbackRequest = request.getFallback();
        if (cacheConfig) {
            const cachedValue = await this.getCache(request.getUrl());
            if (cachedValue) {
                return cachedValue;
            }
        }
        const result = await this.axios
            .get(fallbackRequest.getUrl(), config)
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
        if (cacheConfig) {
            await this.setCache(request.getUrl(), JSON.stringify(result), cacheConfig);
        }

        return result;
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

    private async getCache(url: string) {
        const client = await new RedisClient().init();
        return await client.getValue(url);
    }

    private async setCache(url: string, value: string, cacheConfig: CacheConfig) {
        const client = await new RedisClient().init();
        return await client.setValue(url, value, cacheConfig);
    }

    private getDefaultCacheConfig() {
        return {
            cacheable: false,
            expiration: 3600,
        };
    }
}
