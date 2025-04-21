// src/websocket/websocket.module.ts
import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  providers: [SocketGateway, SocketService],
  exports: [SocketService],
})
export class SocketModule {}
