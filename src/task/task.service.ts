// src/task/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../user/entities/user.entity';
import { SocketService } from 'src/websocket/socket.service';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly socketService: SocketService,
    private readonly logsService: LogsService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { assignedTo, ...data } = createTaskDto;

    let user: User | undefined;

    if (assignedTo !== undefined) {
      const found = await this.userRepository.findOne({
        where: { id: assignedTo },
        select: ['id', 'username', 'role'], // you can adjust this
      });

      if (!found) {
        throw new NotFoundException(`User #${assignedTo} not found`);
      }

      user = found;
    }

    const task = this.taskRepository.create({
      ...data,
      assignedTo: user,
    });

    const savedTask = this.taskRepository.save(task);

    // Notify via WebSocket
    if (user) {
      this.socketService.emitToUser(user.id, 'taskAssigned', savedTask);
    }
    await this.logsService.logEvent('taskCreated', savedTask);
    return savedTask;
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException(`Task #${id} not found`);

    if (dto.status) {
      task.status = dto.status;
    }
    if (dto.assignedTo !== undefined) {
      const found = await this.userRepository.findOneBy({ id: dto.assignedTo });
      if (!found)
        throw new NotFoundException(`User #${dto.assignedTo} not found`);
      task.assignedTo = found;
    }

    const updatedTask = this.taskRepository.save(task);
    // Notify via WebSocket
    if ((await updatedTask).assignedTo) {
      this.socketService.emitToUser(
        (await updatedTask).assignedTo.id,
        'taskUpdated',
        updatedTask,
      );
    }
    await this.logsService.logEvent('taskUpdated', updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task #${id} not found`);
    }
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['assignedTo'] });
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['assignedTo'],
    });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return task;
  }
}
