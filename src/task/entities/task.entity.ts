// src/task/entities/task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'Pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: true })
  assignedTo: User;
}
