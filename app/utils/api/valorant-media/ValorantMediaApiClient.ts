import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { CacheConfig, RedisClient } from '~/utils/api/redis/RedisClient';

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
            console.log('Got from media cache, took', new Date().getTime() - startTime, 'ms');
            return JSON.parse(cached);
        }
        const result = await this.axios.get(url).then((res) => this.parseMediaResponse(res));
        await this.setCache(url, JSON.stringify(result));
        console.log('Got from media api', url, 'took', new Date().getTime() - startTime, 'ms');
        return result;
    }

    private async getCache(url: string) {
        const client = await new RedisClient().init();
        const value = await client.getValue(url, this.getDefaultCacheConfig());
        await client.disconnect();
        return value;
    }

    private async setCache(url: string, value: string) {
        const client = await new RedisClient().init();
        await client.setValue(url, value, this.getDefaultCacheConfig());
        await client.disconnect();
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
