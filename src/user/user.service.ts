import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly redisService: RedisService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(role, 'roel');
    const user = this.userRepository.create({
      username: username,
      password: hashedPassword,
      role: role, // use Role enum, default to Role.User
    });
    return this.userRepository.save(user);
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { username, password } = updateUserDto;
    if (username) user.username = username;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user ?? undefined;
  }

  async verifyPassword(user: User, rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, user.password);
  }

  async getUsers(): Promise<User[]> {
    const cacheKey = 'users:role-user';

    // Try to get from Redis first
    const cached = await this.redisService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const users = await this.userRepository.find({
      select: ['id', 'username', 'role'], // Select only the fields you need
      where: { role: Role.User },
    });

    // Store in Redis
    await this.redisService.set(cacheKey, JSON.stringify(users), 60); // cache for 60 seconds
    return users;
  }
}
