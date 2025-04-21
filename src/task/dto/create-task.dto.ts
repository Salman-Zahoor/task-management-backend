// src/task/dto/create-task.dto.ts
import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(['Pending', 'In Progress', 'Completed'])
  status?: string;

  @IsOptional()
  @IsInt()
  assignedTo?: number; // Use user ID (number) here, which will later reference the User entity
}
