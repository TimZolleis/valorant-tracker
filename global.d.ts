import Redis from 'ioredis';
import { RedisClient, RedisConfig } from '~/utils/api/redis/RedisClient';

declare global {
    var globalRedisClient: RedisClient;
    var cache: Map<string, RedisClient>;
}
