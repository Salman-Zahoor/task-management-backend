// src/task/__tests__/task.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
import { SocketService } from '../../websocket/socket.service';
import { CreateTaskDto } from '../dto/create-task.dto';

const mockTaskRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
});

const mockUserRepo = () => ({
  findOne: jest.fn(),
  findOneBy: jest.fn(),
});

const mockSocketService = {
  emitToUser: jest.fn(),
};

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: jest.Mocked<Repository<Task>>;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: getRepositoryToken(Task), useFactory: mockTaskRepo },
        { provide: getRepositoryToken(User), useFactory: mockUserRepo },
        { provide: SocketService, useValue: mockSocketService },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get(getRepositoryToken(Task));
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should create a task and emit a socket event', async () => {
    const dto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
      assignedTo: 1,
    };

    const user = { id: 1, username: 'john', role: 'user' } as User;
    const task = { ...dto, id: 1, assignedTo: user } as Task;

    userRepository.findOne.mockResolvedValue(user);
    taskRepository.create.mockReturnValue(task);
    taskRepository.save.mockResolvedValue(task);

    const result = await service.createTask(dto);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      select: ['id', 'username', 'role'],
    });
    expect(taskRepository.save).toHaveBeenCalled();
    expect(mockSocketService.emitToUser).toHaveBeenCalledWith(
      1,
      'taskAssigned',
      task,
    );
    expect(result).toEqual(task);
  });
});
