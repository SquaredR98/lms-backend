import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '@modules/users/users.service';
import { UserRepository } from '@database/entities/users/repository';
import { User } from '@database/entities/users/entity';
import { JwtStrategy } from './jwt.strategy';
import { AuditLogModule } from '@modules/audit-log/audit-log.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}), // Configured dynamically in AuthService
    AuditLogModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {} 