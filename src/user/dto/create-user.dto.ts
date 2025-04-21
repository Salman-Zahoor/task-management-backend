import { IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../entities/user.entity';
export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional() // optional, or use @IsEnum(['admin', 'user'])
  @IsEnum(Role)
  role?: Role;
}
