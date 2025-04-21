import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(createTaskDto: CreateTaskDto): Promise<import("./entities/task.entity").Task>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<import("./entities/task.entity").Task>;
    deleteTask(id: number): Promise<void>;
    getAllTasks(): Promise<import("./entities/task.entity").Task[]>;
    getTaskById(id: number): Promise<import("./entities/task.entity").Task>;
}
