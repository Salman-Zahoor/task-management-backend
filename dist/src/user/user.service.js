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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const redis_service_1 = require("../redis/redis.service");
let UserService = class UserService {
    userRepository;
    redisService;
    constructor(userRepository, redisService) {
        this.userRepository = userRepository;
        this.redisService = redisService;
    }
    async createUser(createUserDto) {
        const { username, password, role } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(role, 'roel');
        const user = this.userRepository.create({
            username: username,
            password: hashedPassword,
            role: role,
        });
        return this.userRepository.save(user);
    }
    async updateUser(userId, updateUserDto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { username, password } = updateUserDto;
        if (username)
            user.username = username;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        return this.userRepository.save(user);
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOne({ where: { username } });
        return user ?? undefined;
    }
    async verifyPassword(user, rawPassword) {
        return bcrypt.compare(rawPassword, user.password);
    }
    async getUsers() {
        const cacheKey = 'users:role-user';
        const cached = await this.redisService.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const users = await this.userRepository.find({
            select: ['id', 'username', 'role'],
            where: { role: user_entity_1.Role.User },
        });
        await this.redisService.set(cacheKey, JSON.stringify(users), 60);
        return users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        redis_service_1.RedisService])
], UserService);
//# sourceMappingURL=user.service.js.map