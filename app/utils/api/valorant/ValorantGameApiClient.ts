import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
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
import { ROUTES } from '~/config/Routes';
import { CacheConfig, constructKey, getRedisInstance } from '~/utils/api/redis/RedisClient';
import { ReauthenticationRequiredException } from '~/models/exception/reauthentication/ReauthenticationRequiredException';

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
        isFallback = false
    ) {
        if (cacheConfig) {
            const cachedValue = await this.getCache(request.getEndpoint(), cacheConfig);
            if (cachedValue) {
                return JSON.parse(cachedValue);
            }
        }
        const url = isFallback ? request.getFallback().getUrl() : request.getUrl();
        const result = await this.axios
            .get(url, config)
            .then((res) => {
                return res.data;
            })
            .catch(async (error) => {
                if (error.response?.status === 400) {
                    throw new ReauthenticationRequiredException().handle();
                }
                if (error.response?.status >= 500) {
                    if (!isFallback) {
                        await this.get(request, config, cacheConfig, true);
                    } else {
                        throw new RiotServicesUnavailableException();
                    }
                }
                if (error.response?.status === 429) {
                    console.log('Too fast!');
                }
                throw new Error('Get failed');
            });
        if (cacheConfig) {
            await this.setCache(request.getEndpoint(), JSON.stringify(result), cacheConfig);
        }
        return result;
    }

    async post(
        request: RiotRequest,
        body: Object,
        config?: AxiosRequestConfig<any>,
        isFallback: boolean = true
    ) {
        const url = isFallback ? request.getFallback().getUrl() : request.getUrl();
        return await this.axios
            .post(url, body)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response?.status === 400) {
                    throw redirect(ROUTES.REAUTH);
                }
                if (error.response?.status >= 500) {
                    if (!isFallback) {
                        this.post(request, body, config, true);
                    }
                    throw new RiotServicesUnavailableException();
                } else {
                    throw new Error(error.message);
                }
            });
    }

    async put(request: RiotRequest, body: Object, config?: AxiosRequestConfig<any>) {
        return await this.axios
            .put(request.getUrl(), body, config)
            .then((res) => res.data)
            .catch((error) => {
                if (error.response?.status === 400) {
                    throw redirect(ROUTES.REAUTH);
                }
                throw new RiotServicesUnavailableException();
            });
    }

    private async getCache(url: string, cacheConfig: CacheConfig) {
        const client = await getRedisInstance();
        const result = await client.getValue(url, cacheConfig);
        return result;
    }

    private async setCache(url: string, value: string, cacheConfig: CacheConfig) {
        const instance = await getRedisInstance();
        await instance.setValue(url, value, cacheConfig);
    }
}
