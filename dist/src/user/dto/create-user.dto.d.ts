import { Role } from '../entities/user.entity';
export declare class CreateUserDto {
    username: string;
    password: string;
    role?: Role;
}
