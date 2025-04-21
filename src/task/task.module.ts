// src/task/task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { User } from '../user/entities/user.entity';
import { SocketModule } from 'src/websocket/socket.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]), // you need User repo in TaskService as well
    SocketModule,
    LogsModule,
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
