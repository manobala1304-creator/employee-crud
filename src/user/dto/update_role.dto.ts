import { Role } from '../../auth/enums/role.enum';
import { IsEnum } from 'class-validator';

export class UpdateRoleDto {
  @IsEnum(Role)
  role: Role;
}
  