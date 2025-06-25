import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionGuard } from './permission.guard';
import { UserRoleRepository } from '@database/entities/user_roles/repository';
import { RolePermissionRepository } from '@database/entities/role_permissions/repository';
import { PermissionRepository } from '@database/entities/permissions/repository';
import { PolicyRepository } from '@database/entities/policies/repository';
import { UserAttributeRepository } from '@database/entities/user_attributes/repository';

@Module({
  providers: [
    PermissionService,
    PermissionGuard,
    UserRoleRepository,
    RolePermissionRepository,
    PermissionRepository,
    PolicyRepository,
    UserAttributeRepository,
  ],
  exports: [PermissionService, PermissionGuard],
})
export class AccessControlModule {} 