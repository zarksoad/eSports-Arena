import { Injectable, OnModuleInit } from '@nestjs/common';
import { InsertUserService } from 'src/modules/auth/services/insert-seeds/insert-users-seed.service';
import { RoleService } from 'src/modules/auth/services/insert-seeds/insert.role-seed.service';

@Injectable()
export class AppInitializer implements OnModuleInit {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: InsertUserService,
  ) {}

  async onModuleInit() {
    await this.roleService.insertRoles();
    await this.userService.insertAdminUser();
    await this.userService.insertPlayerUser();
  }
}
