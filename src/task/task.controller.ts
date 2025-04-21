// src/task/task.controller.ts
import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Delete,
  Get,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('create')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto, // Use UpdateTaskDto here
  ) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTaskById(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }
}
