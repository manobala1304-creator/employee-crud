import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSupervisorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  designation: string;
}

