import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permission.decorator';
import { PermissionService } from './permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<string>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermission) {
      return true; // No permission required
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.id) {
      throw new ForbiddenException('User not authenticated');
    }
    // Optionally, get contextId from request (e.g., req.params.courseId)
    const contextId = request.contextId || undefined;
    const hasPermission = await this.permissionService.hasPermission(user.id, requiredPermission, contextId);
    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return true;
  }
} 