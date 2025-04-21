// src/logs/logs.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventLog } from './schemas/event-log.schema';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(EventLog.name) private readonly logModel: Model<EventLog>,
  ) {}

  async logEvent(event: string, payload: any): Promise<void> {
    await this.logModel.create({ event, payload });
  }
}
