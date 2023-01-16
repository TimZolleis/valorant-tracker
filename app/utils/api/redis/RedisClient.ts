import { createClient, RedisClientType } from 'redis';
import process from 'process';

export type CacheConfig = {
    cacheable: boolean;
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

    async setValue(url: string, value: string, cacheConfig: CacheConfig) {
        await this.client.setEx(url, cacheConfig.expiration, value);
        this.client.disconnect();
    }

    async getValue(url: string) {
        const result = await this.client.get(url);
        this.client.disconnect();
        return result;
    }
}
