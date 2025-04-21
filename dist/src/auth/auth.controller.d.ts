import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
