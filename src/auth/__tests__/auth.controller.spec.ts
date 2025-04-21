import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest
              .fn()
              .mockResolvedValue({ message: 'User registered' }),
            login: jest.fn().mockResolvedValue({ access_token: 'mock-token' }),
          },
        },
        {
          provide: JwtService,
          useValue: {}, // Optional, only if you call it directly
        },
        {
          provide: UserService,
          useValue: {}, // Mock it only if used inside AuthService
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const result = await controller.register({
      username: 'test',
      password: '123456',
    });
    expect(result).toEqual({ message: 'User registered' });
  });

  it('should login a user', async () => {
    const result = await controller.login({
      username: 'test',
      password: '123456',
    });
    expect(result).toEqual({ access_token: 'mock-token' });
  });
});
