import { Task } from '../../task/entities/task.entity';
export declare enum Role {
    Admin = "admin",
    User = "user"
}
export declare class User {
    id: number;
    username: string;
    password: string;
    role: Role;
    tasks: Task[];
}
