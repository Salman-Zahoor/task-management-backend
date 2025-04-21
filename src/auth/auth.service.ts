// ====== src/auth/auth.service.ts ======
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * Registers a new user
   */
  async register(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Validates user credentials and returns user entity
   */
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findByUsername(username);
    if (user && (await this.userService.verifyPassword(user, pass))) {
      return user;
    }
    return null;
  }

  /**
   * Logs in a user and issues a JWT
   */
  // async login(user: any) {
  //   // login logic handled by JwtStrategy
  //   console.log(user, 'user');

  //   return user;
  // }
}
