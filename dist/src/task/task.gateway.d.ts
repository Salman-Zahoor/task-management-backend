import { Server } from 'socket.io';
export declare class TaskGateway {
    server: Server;
    handleTaskUpdated(client: any, data: any): void;
}
