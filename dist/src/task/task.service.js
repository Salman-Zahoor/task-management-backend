"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const user_entity_1 = require("../user/entities/user.entity");
const socket_service_1 = require("../websocket/socket.service");
const logs_service_1 = require("../logs/logs.service");
let TaskService = class TaskService {
    taskRepository;
    userRepository;
    socketService;
    logsService;
    constructor(taskRepository, userRepository, socketService, logsService) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.socketService = socketService;
        this.logsService = logsService;
    }
    async createTask(createTaskDto) {
        const { assignedTo, ...data } = createTaskDto;
        let user;
        if (assignedTo !== undefined) {
            const found = await this.userRepository.findOne({
                where: { id: assignedTo },
                select: ['id', 'username', 'role'],
            });
            if (!found) {
                throw new common_1.NotFoundException(`User #${assignedTo} not found`);
            }
            user = found;
        }
        const task = this.taskRepository.create({
            ...data,
            assignedTo: user,
        });
        const savedTask = this.taskRepository.save(task);
        if (user) {
            this.socketService.emitToUser(user.id, 'taskAssigned', savedTask);
        }
        await this.logsService.logEvent('taskCreated', savedTask);
        return savedTask;
    }
    async updateTask(id, dto) {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task)
            throw new common_1.NotFoundException(`Task #${id} not found`);
        if (dto.status) {
            task.status = dto.status;
        }
        if (dto.assignedTo !== undefined) {
            const found = await this.userRepository.findOneBy({ id: dto.assignedTo });
            if (!found)
                throw new common_1.NotFoundException(`User #${dto.assignedTo} not found`);
            task.assignedTo = found;
        }
        const updatedTask = this.taskRepository.save(task);
        if ((await updatedTask).assignedTo) {
            this.socketService.emitToUser((await updatedTask).assignedTo.id, 'taskUpdated', updatedTask);
        }
        await this.logsService.logEvent('taskUpdated', updatedTask);
        return updatedTask;
    }
    async deleteTask(id) {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Task #${id} not found`);
        }
    }
    async getAllTasks() {
        return this.taskRepository.find({ relations: ['assignedTo'] });
    }
    async getTaskById(id) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['assignedTo'],
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task #${id} not found`);
        }
        return task;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        socket_service_1.SocketService,
        logs_service_1.LogsService])
], TaskService);
//# sourceMappingURL=task.service.js.map