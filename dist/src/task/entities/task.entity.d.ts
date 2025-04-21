import { User } from '../../user/entities/user.entity';
export declare class Task {
    id: number;
    title: string;
    description: string;
    status: string;
    assignedTo: User;
}
