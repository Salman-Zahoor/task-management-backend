import { SocketGateway } from './socket.gateway';
export declare class SocketService {
    private readonly gateway;
    constructor(gateway: SocketGateway);
    emitToUser(userId: number, event: string, payload: any): void;
}
