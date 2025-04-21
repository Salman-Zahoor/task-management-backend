import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
interface AuthRequest extends Request {
    user?: any;
}
export declare class AuthMiddleware implements NestMiddleware {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    use(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
export {};
