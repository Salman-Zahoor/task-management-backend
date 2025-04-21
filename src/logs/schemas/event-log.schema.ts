// src/logs/schemas/event-log.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EventLog extends Document {
  @Prop({ required: true })
  event: string;

  @Prop({ type: Object, required: true })
  payload: any;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);
