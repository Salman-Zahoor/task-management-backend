"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_service_1 = require("./task.service");
const task_controller_1 = require("./task.controller");
const task_entity_1 = require("./entities/task.entity");
const user_entity_1 = require("../user/entities/user.entity");
const socket_module_1 = require("../websocket/socket.module");
const logs_module_1 = require("../logs/logs.module");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([task_entity_1.Task, user_entity_1.User]),
            socket_module_1.SocketModule,
            logs_module_1.LogsModule,
        ],
        providers: [task_service_1.TaskService],
        controllers: [task_controller_1.TaskController],
    })
], TaskModule);
//# sourceMappingURL=task.module.js.map