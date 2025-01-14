import { ConsoleLogger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBConfigService, entities } from '../db/db-config.service';
import { MessagingModule } from '../messaging/messaging.module';
import { AuditLogsController } from './controllers/audit-logs.controller';
import { InterServiceController } from './controllers/inter-service.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { RolesController } from './controllers/roles.controller';
import { UserAuthorizationController } from './controllers/user-authorization.controller';
import { AuditLogsService } from './services/audit-logs.service';
import { PermissionsService } from './services/permissions.service';
import { RolesService } from './services/roles.service';
import { UserAuthorizationService } from './services/user-authorization.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { OrderQueryValidator } from './validators/order-query-string.validator';
import { PermissionExistsValidator } from './validators/permission-exists.validator';
import { PermissionsExistValidator } from './validators/permissions-exist.validator';
import { RoleExistsValidator } from './validators/role-exists.validator';
import { RolesExistValidator } from './validators/roles-exist.validator';
import { SameAsValidator } from './validators/same-as.validator';

@Module({
  imports: [TypeOrmModule.forFeature(entities), MessagingModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [
    PermissionsController,
    RolesController,
    UserAuthorizationController,
    AuditLogsController,
    InterServiceController
  ],
  providers: [
    ConsoleLogger,
    JwtStrategy,
    DBConfigService,
    PermissionsService,
    RolesService,
    PermissionsService,
    UserAuthorizationService,
    AuditLogsService,
    SameAsValidator,
    PermissionExistsValidator,
    PermissionsExistValidator,
    RoleExistsValidator,
    RolesExistValidator,
    OrderQueryValidator
  ],
  exports: [TypeOrmModule, PermissionsService, RolesService, UserAuthorizationService, AuditLogsService]
})
export class RolesModule {}
