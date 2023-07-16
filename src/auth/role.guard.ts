import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRequest } from 'src/users/user-request.interface';
import { Role } from 'src/users/users.entity';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly allowedRoles: Role[]) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user: UserRequest = request.user;

        // Check if the user has any of the allowed roles
        if (
            user &&
            user.roles.some((role: Role) => this.allowedRoles.includes(role))
        ) {
            return true; // Allow access
        }

        return false; // Deny access
    }
}
