import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
      },
    });

    this.client.on('error', (err) => console.error('Redis error:', err));
    await this.client.connect();
  }

  async set(key: string, value: string, ttlSeconds?: number) {
    await this.client.set(key, value);
    if (ttlSeconds) await this.client.expire(key, ttlSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async delete(key: string) {
    await this.client.del(key);
  }
}
