import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<import("../user/entities/user.entity").User>;
    validateUser(username: string, pass: string): Promise<import("../user/entities/user.entity").User | null>;
}
