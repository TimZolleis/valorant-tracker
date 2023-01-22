import type { RedisClientType } from 'redis';
import process from 'process';
import Redis from 'ioredis';
import { EnvironmentVariableNotPresentException } from '~/models/exception/general/EnvironmentVariableNotPresentException';
import { red } from 'kleur/colors';

export type CacheConfig = {
    key: string;
    expiration: number;
};

type RedisProvider = 'redis' | 'upstash';

export class RedisConfig {
    provider: RedisProvider;
    databaseUrl: string;
    databasePort: number;
    tlsConfig: Object;

    password: string;

    constructor(provider: RedisProvider) {
        this.provider = provider;
        switch (provider) {
            case 'redis': {
                this.databaseUrl = this.requireEnvironmentVariable('REDIS_URL');
                this.password = this.requireEnvironmentVariable('REDIS_PASSWORD');
                this.databasePort = parseInt(this.requireEnvironmentVariable('REDIS_PORT'));
                this.tlsConfig = {};
                break;
            }
            case 'upstash': {
                this.databaseUrl = this.requireEnvironmentVariable('UPSTASH_URL');
                this.password = this.requireEnvironmentVariable('UPSTASH_PASSWORD');
                this.databasePort = parseInt(this.requireEnvironmentVariable('UPSTASH_PORT'));
                this.tlsConfig = {};
                break;
            }
        }
    }

    private requireEnvironmentVariable(env: string) {
        const envElement = process.env[env];
        if (!envElement) {
            throw new EnvironmentVariableNotPresentException(env);
        }
        return envElement;
    }

    getRedisUrl() {
        return `redis://default:${this.password}@${this.databaseUrl}:${this.databasePort}`;
    }
}

export class RedisClient {
    client: Redis;

    constructor(redisInstance: Redis) {
        this.client = redisInstance;
    }

    async init() {
        await this.client.connect();
        return this;
    }

    private constructKey(url: string, cacheConfig: CacheConfig) {
        return `${url}-${cacheConfig.key}`;
    }

    async setValue(url: string, value: string, cacheConfig: CacheConfig) {
        await this.client.setex(this.constructKey(url, cacheConfig), cacheConfig.expiration, value);
    }

    async getValue(url: string, cacheConfig: CacheConfig) {
        console.log('Getting from cache', url);
        return this.client.get(this.constructKey(url, cacheConfig));
    }
    async disconnect() {
        await this.client.disconnect();
    }
}

export function constructKey(url: string, cacheConfig: CacheConfig) {
    return `${url}-${cacheConfig.key}`;
}

var instance: RedisClient | null = null;

export const getRedisInstance = async (): Promise<RedisClient> => {
    if (!instance) {
        await redisClient.client('KILL', 'type', 'normal');
        instance = new RedisClient(redisClient);
    }
    return instance;
};
const config = new RedisConfig('redis');
// @ts-ignore
const redisClient = new Redis({
    port: config.databasePort,
    host: config.databaseUrl,
    username: 'default',
    password: config.password,
    retryStrategy: () => false,
});

export default redisClient;
