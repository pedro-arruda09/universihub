import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class IsAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const role = request?.user?.role;

        if (!role) {
            return false;
        }

        return true;
    }
}
