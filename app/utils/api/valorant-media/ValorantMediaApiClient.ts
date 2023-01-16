import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { DateTime } from 'luxon';
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
        const cachedValue = await this.getCache(url);
        if (!cachedValue) {
            console.log('Fetching from media api', url);
            const result = await this.axios.get(url).then((res) => this.parseMediaResponse(res));
            await this.setCache(url, JSON.stringify(result));
            return result;
        } else return JSON.parse(cachedValue);
    }

    private async getCache(url: string) {
        console.log('Getting from media cache');
        const startTime = DateTime.now().toSeconds();
        const client = await new RedisClient().init();
        console.log('Media Client created');
        const result = await client.getValue(url);
        const time = DateTime.now().toSeconds() - startTime;
        console.log('Got media result, took', time);
        return result;
    }

    private async setCache(url: string, value: string) {
        const cacheConfig = {
            cacheable: true,
            expiration: 3600,
        };
        const client = await new RedisClient().init();
        return await client.setValue(url, value, cacheConfig);
    }

    parseMediaResponse(response: AxiosResponse) {
        return response.data.data;
    }
}

export const MEDIA_API_ENDPOINTS = {
    BASE: 'https://valorant-api.com/v1',

    VERSION: '/version',
};
