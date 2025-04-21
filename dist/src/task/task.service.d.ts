import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../user/entities/user.entity';
import { SocketService } from 'src/websocket/socket.service';
import { LogsService } from 'src/logs/logs.service';
export declare class TaskService {
    private readonly taskRepository;
    private readonly userRepository;
    private readonly socketService;
    private readonly logsService;
    constructor(taskRepository: Repository<Task>, userRepository: Repository<User>, socketService: SocketService, logsService: LogsService);
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    updateTask(id: number, dto: UpdateTaskDto): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
}
