// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RedisModule } from 'src/redis/redis.module';
import { SocketModule } from 'src/websocket/socket.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule], // 👈 important!
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // 👈 important!
})
export class UserModule {}
