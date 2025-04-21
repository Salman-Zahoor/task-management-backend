import { Document } from 'mongoose';
export declare class EventLog extends Document {
    event: string;
    payload: any;
}
export declare const EventLogSchema: import("mongoose").Schema<EventLog, import("mongoose").Model<EventLog, any, any, any, Document<unknown, any, EventLog> & EventLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventLog, Document<unknown, {}, import("mongoose").FlatRecord<EventLog>> & import("mongoose").FlatRecord<EventLog> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
