import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisService } from 'src/redis/redis.service';
export declare class UserService {
    private readonly userRepository;
    private readonly redisService;
    constructor(userRepository: Repository<User>, redisService: RedisService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<User>;
    findByUsername(username: string): Promise<User | undefined>;
    verifyPassword(user: User, rawPassword: string): Promise<boolean>;
    getUsers(): Promise<User[]>;
}
