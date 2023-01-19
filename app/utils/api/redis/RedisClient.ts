import type { RedisClientType } from 'redis';
import { createClient } from 'redis';
import process from 'process';
import fs from 'fs';

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
        const fs = require('fs');
        fs.writeFile(
            `C:\\Users\\tim\\IdeaProjects\\valorant-tracker\\tmp\\cached-${new Date().getTime()}.txt`,
            value,
            function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log('The file was saved!');
            }
        );
        await this.client.setEx(url, cacheConfig.expiration, value);
    }

    async getValue(url: string) {
        return await this.client.get(url);
    }

    async disconnect() {
        await this.client.disconnect();
    }
}
