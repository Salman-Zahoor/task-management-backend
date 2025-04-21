// src/websocket/socket.service.ts
import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SocketService {
  constructor(private readonly gateway: SocketGateway) {}

  emitToUser(userId: number, event: string, payload: any) {
    this.gateway.server.to(`user_${userId}`).emit(event, payload);
  }
}
