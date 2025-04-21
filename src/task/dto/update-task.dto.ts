// src/task/dto/update-task.dto.ts
import { IsOptional, IsEnum, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsEnum(['Pending', 'In Progress', 'Completed'])
  status?: string;

  @IsOptional()
  @IsString()
  assignedTo?: number; // User ID or name
}
