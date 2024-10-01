import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user || !user.roles) {
      throw new BadRequestException('User not found');
    }

    const userRoles = user.roles.map((role) => role.name);

    if (validRoles.some((role) => userRoles.includes(role))) {
      return true;
    }

    throw new ForbiddenException(
      `User ${user.fullName} does not have the required roles: [${validRoles}]`,
    );
  }
}
