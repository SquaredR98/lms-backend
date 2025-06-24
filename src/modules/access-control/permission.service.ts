import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleRepository } from '@database/entities/user_roles/repository';
import { RolePermissionRepository } from '@database/entities/role_permissions/repository';
import { PermissionRepository } from '@database/entities/permissions/repository';
import { PolicyRepository } from '@database/entities/policies/repository';
import { UserAttributeRepository } from '@database/entities/user_attributes/repository';

@Injectable()
export class PermissionService {
  constructor(
    private readonly userRoleRepo: UserRoleRepository,
    private readonly rolePermissionRepo: RolePermissionRepository,
    private readonly permissionRepo: PermissionRepository,
    private readonly policyRepo: PolicyRepository,
    private readonly userAttributeRepo: UserAttributeRepository,
  ) {}

  /**
   * Check if a user has a given permission in a context (RBAC + ABAC)
   */
  async hasPermission(userId: string, permissionName: string, contextId?: string): Promise<boolean> {
    // 1. RBAC: Get all roles for user in context
    const userRoles = await this.userRoleRepo.findAll();
    const roles = userRoles.filter(ur => ur.user.id === userId && (!contextId || ur.context.id === contextId));
    if (!roles.length) return false;

    // 2. RBAC: Get all permissions for these roles
    const allRolePermissions = await this.rolePermissionRepo.findAll();
    const roleIds = roles.map(r => r.role.id);
    const permissions = allRolePermissions.filter(rp => roleIds.includes(rp.role.id));
    const hasRBAC = permissions.some(p => p.permission.name === permissionName);
    if (hasRBAC) return true;

    // 3. ABAC: Check policies for this permission
    const policies = await this.policyRepo.findAll();
    const relevantPolicies = policies.filter(p => p.permission.name === permissionName && (!contextId || (p.context && p.context.id === contextId)));
    for (const policy of relevantPolicies) {
      if (await this.evaluatePolicy(userId, policy)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Evaluate a single ABAC policy for a user
   */
  async evaluatePolicy(userId: string, policy: any): Promise<boolean> {
    // Example: policy.rule is a JSON string like { "attribute": "department", "equals": "science" }
    try {
      const rule = typeof policy.rule === 'string' ? JSON.parse(policy.rule) : policy.rule;
      if (!rule || !rule.attribute) return false;
      const userAttrs = await this.userAttributeRepo.findAll();
      const attr = userAttrs.find(ua => ua.user.id === userId && ua.attribute.name === rule.attribute);
      if (!attr) return false;
      if (rule.equals !== undefined) {
        return attr.value === rule.equals;
      }
      // Extend here for more complex rules
      return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get all permissions for a user in a context (RBAC + ABAC)
   */
  async getUserPermissions(userId: string, contextId?: string): Promise<string[]> {
    const userRoles = await this.userRoleRepo.findAll();
    const roles = userRoles.filter(ur => ur.user.id === userId && (!contextId || ur.context.id === contextId));
    const allRolePermissions = await this.rolePermissionRepo.findAll();
    const roleIds = roles.map(r => r.role.id);
    const permissions = allRolePermissions.filter(rp => roleIds.includes(rp.role.id));
    const permNames = new Set(permissions.map(p => p.permission.name));
    // ABAC: Add permissions from policies
    const policies = await this.policyRepo.findAll();
    for (const policy of policies) {
      if (!contextId || (policy.context && policy.context.id === contextId)) {
        if (await this.evaluatePolicy(userId, policy)) {
          permNames.add(policy.permission.name);
        }
      }
    }
    return Array.from(permNames);
  }
} 