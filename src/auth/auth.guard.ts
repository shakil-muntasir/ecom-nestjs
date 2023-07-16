import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import env from 'src/configs/env';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);
        
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = jwt.verify(token, env.JWT_ACCESS_SECRET,);
            
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
