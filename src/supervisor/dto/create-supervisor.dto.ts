import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSupervisorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

 @Type(() => Number)
 @IsInt()
 managerId: number;


}

