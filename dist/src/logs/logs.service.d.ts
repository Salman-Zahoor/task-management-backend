import { Model } from 'mongoose';
import { EventLog } from './schemas/event-log.schema';
export declare class LogsService {
    private readonly logModel;
    constructor(logModel: Model<EventLog>);
    logEvent(event: string, payload: any): Promise<void>;
}
