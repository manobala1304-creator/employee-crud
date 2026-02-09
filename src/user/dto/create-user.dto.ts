import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

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
}


