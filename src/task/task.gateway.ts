// src/task/task.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('taskUpdated')
  handleTaskUpdated(client: any, data: any) {
    this.server.emit('taskUpdated', data);
  }
}
