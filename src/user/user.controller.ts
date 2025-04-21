// src/user/user.controller.ts
import {
  Controller,
  Put,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId;
    return this.userService.updateUser(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('getUsers')
  async getUsers(@Request() req) {
    return this.userService.getUsers();
  }
}
