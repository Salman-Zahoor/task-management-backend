import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    updateUser(req: any, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    getUsers(req: any): Promise<import("./entities/user.entity").User[]>;
}
