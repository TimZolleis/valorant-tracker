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
import * as url from 'url';
import { DateTime } from 'luxon';

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

    async get(
        request: RiotRequest,
        config?: AxiosRequestConfig<any>,
        cacheConfig?: CacheConfig,
        useFallback = false
    ) {
        if (cacheConfig) {
            const cachedValue = await this.getCache(request.getEndpoint());
            if (cachedValue) {
                return JSON.parse(cachedValue);
            }
        }
        const url = useFallback ? request.getFallback().getUrl() : request.getUrl();
        const startTime = new Date().getTime();
        console.log('Fetching', request.getUrl());
        const result = await this.axios
            .get(url, config)
            .then((res) => res.data)
            .catch(async (error) => {
                if (error.response?.status === 400) {
                    throw redirect('/reauth');
                }
                if (error.response?.status >= 500) {
                    if (!useFallback) {
                        // await this.get(request, config, cacheConfig, true);
                    } else {
                        console.log(error, url);
                        throw new RiotServicesUnavailableException();
                    }
                } else {
                    throw new Error(error.message);
                }
            });
        if (cacheConfig) {
            console.log('Got result', JSON.stringify(result).length);
            await this.setCache(request.getEndpoint(), JSON.stringify(result), cacheConfig);
        }
        console.log('Got from Riot Api, took', new Date().getTime() - startTime);
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

    async put(request: RiotRequest, body: Object, config?: AxiosRequestConfig<any>) {
        return await this.axios
            .put(request.getUrl(), body, config)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response?.status === 400) {
                    throw redirect('/reauth');
                }
                throw new RiotServicesUnavailableException();
            });
    }

    private async getCache(url: string) {
        const client = await new RedisClient().init();
        const value = await client.getValue(url);
        await client.disconnect();
        return value;
    }

    private async setCache(url: string, value: string, cacheConfig: CacheConfig) {
        console.log('Setting to cache', url);
        const client = await new RedisClient().init();
        await client.setValue(url, value, cacheConfig);
        await client.disconnect();
    }

    private getDefaultCacheConfig() {
        return {
            cacheable: false,
            expiration: 3600,
        };
    }
}
