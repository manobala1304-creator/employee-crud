import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateManagerDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  department: string;
}
