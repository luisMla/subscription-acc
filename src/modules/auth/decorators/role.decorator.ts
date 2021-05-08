import { SetMetadata } from '@nestjs/common';
import { ROL } from '../../common/enums/role.enum';

export const Roles = (roles: ROL[]) => SetMetadata('roles', roles);
