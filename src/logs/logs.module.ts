// src/logs/logs.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventLog, EventLogSchema } from './schemas/event-log.schema';
import { LogsService } from './logs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventLog.name, schema: EventLogSchema },
    ]),
  ],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule {}
