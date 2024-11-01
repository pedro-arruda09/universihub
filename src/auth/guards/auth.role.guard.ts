import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enum/roles.enum';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthRoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Role>('role', context.getHandler());

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) throw new ForbiddenException('Token not found');

        const { role } = this.jwtService.verify(token);

        if (!requiredRoles.includes(role)) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
