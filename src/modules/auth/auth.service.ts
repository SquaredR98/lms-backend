import { Injectable, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@modules/users/users.service';
import { UserRepository } from '@database/entities/users/repository';
import { User } from '@database/entities/users/entity';
import { AuditLogService } from '@modules/audit-log/audit-log.service';

const SUPER_ADMIN_ROLE = 'super_admin';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly auditLogService: AuditLogService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }

  async login(email: string, password: string, ip?: string, userAgent?: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      await this.auditLogService.log('login_failed', { email }, undefined, ip, userAgent);
      throw new UnauthorizedException('Invalid credentials');
    }
    // Optionally, add rate limiting and IP checks for super_admin
    const payload = { sub: user.id, email: user.email, role: user.role };
    await this.auditLogService.log('login_success', { email }, user.id, ip, userAgent);
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'supersecret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      }),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async register(data: { firstName: string; lastName: string; email: string; password: string; role?: string }, ip?: string, userAgent?: string) {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new UnauthorizedException('Email already in use');
    const hash = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      ...data,
      password: hash,
      role: data.role || 'student',
    });
    await this.auditLogService.log('register', { email: data.email }, user.id, ip, userAgent);
    return user;
  }

  // Super admin bootstrapping (should be called from a migration/seed script)
  async ensureSuperAdmin() {
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'superadmin@lms.com';
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || 'SuperSecret123!';
    let user = await this.userRepository.findByEmail(superAdminEmail);
    if (!user) {
      const hash = await bcrypt.hash(superAdminPassword, 12);
      user = await this.userRepository.create({
        firstName: 'Super',
        lastName: 'Admin',
        email: superAdminEmail,
        password: hash,
        role: SUPER_ADMIN_ROLE,
      });
      await this.auditLogService.log('super_admin_created', { email: superAdminEmail }, user.id);
    }
    return user;
  }
} 