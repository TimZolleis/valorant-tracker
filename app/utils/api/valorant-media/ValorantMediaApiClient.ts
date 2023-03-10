import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { CacheConfig, constructKey, getRedisInstance } from '~/utils/api/redis/RedisClient';

export class ValorantMediaApiClient {
    axios: AxiosInstance;

    constructor() {
        this.axios = this.getClient();
    }

    private getClient() {
        return axios.create({
            baseURL: MEDIA_API_ENDPOINTS.BASE,
        });
    }

    async get(url: string) {
        const startTime = new Date().getTime();
        const cached = await this.getCache(url);
        if (cached) {
            return JSON.parse(cached);
        }
        const result = await this.axios.get(url).then((res) => this.parseMediaResponse(res));
        await this.setCache(url, JSON.stringify(result));
        return result;
    }

    private async getCache(url: string) {
        const client = await getRedisInstance();
        return await client.getValue(url, this.getDefaultCacheConfig());
    }

    private async setCache(url: string, value: string) {
        const client = await getRedisInstance();
        await client.setValue(url, value, this.getDefaultCacheConfig());
    }

    parseMediaResponse(response: AxiosResponse) {
        return response.data.data;
    }

    private getDefaultCacheConfig(): CacheConfig {
        return {
            key: '',
            expiration: 3600,
        };
    }
}

export const MEDIA_API_ENDPOINTS = {
    BASE: 'https://valorant-api.com/v1',

    VERSION: '/version',
};
