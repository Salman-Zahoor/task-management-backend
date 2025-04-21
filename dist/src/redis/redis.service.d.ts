import { OnModuleInit } from '@nestjs/common';
export declare class RedisService implements OnModuleInit {
    private client;
    onModuleInit(): Promise<void>;
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    delete(key: string): Promise<void>;
}
