"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const mongoose_1 = require("@nestjs/mongoose");
const redis_module_1 = require("./redis/redis.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const task_module_1 = require("./task/task.module");
const user_controller_1 = require("./user/user.controller");
const task_controller_1 = require("./task/task.controller");
const user_entity_1 = require("./user/entities/user.entity");
const task_entity_1 = require("./task/entities/task.entity");
const auth_middleware_1 = require("./auth/auth.middleware");
const socket_module_1 = require("./websocket/socket.module");
const logs_module_1 = require("./logs/logs.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(user_controller_1.UserController, task_controller_1.TaskController);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT) || 5432,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                autoLoadEntities: true,
                entities: [user_entity_1.User, task_entity_1.Task],
                synchronize: true,
                extra: {
                    ssl: {
                        rejectUnauthorized: false,
                    },
                },
            }),
            mongoose_1.MongooseModule.forRoot((() => {
                if (!process.env.MONGO_URI) {
                    throw new Error('MONGO_URI is not defined in .env');
                }
                return process.env.MONGO_URI;
            })()),
            redis_module_1.RedisModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            task_module_1.TaskModule,
            socket_module_1.SocketModule,
            logs_module_1.LogsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map