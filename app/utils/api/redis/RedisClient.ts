import type { RedisClientType } from 'redis';
import { createClient } from 'redis';
import process from 'process';

export type CacheConfig = {
    key: string;
    expiration: number;
};

export class RedisClient {
    client: RedisClientType;

    async init() {
        const url = process.env.REDIS_DATABASE_URL;
        this.client = createClient({
            url: url,
        });
        await this.client.connect();
        return this;
    }

    private constructKey(url: string, cacheConfig: CacheConfig) {
        return `${url}-${cacheConfig.key}`;
    }

    async setValue(url: string, value: string, cacheConfig: CacheConfig) {
        await this.client.setEx(this.constructKey(url, cacheConfig), cacheConfig.expiration, value);
    }

    async getValue(url: string, cacheConfig: CacheConfig) {
        return await this.client.get(this.constructKey(url, cacheConfig));
    }

    async disconnect() {
        await this.client.disconnect();
    }
}
