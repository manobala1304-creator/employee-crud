import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Role } from "src/auth/enums/role.enum";

export class CreateUserDto {

  @ApiProperty()
  @IsString()
  @MaxLength(25)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(60)
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  password: string;

  @IsEnum(Role)
  role:Role;
}


