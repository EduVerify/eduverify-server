import { SetMetadata } from '@nestjs/common';
import { authType } from 'src/types/enum';

export const Roles = (...roles: authType[]) => SetMetadata('roles', roles);
