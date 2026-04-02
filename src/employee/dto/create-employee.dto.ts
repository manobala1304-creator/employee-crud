import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsNumber()
  Supid: number;

  @IsNumber()
  employeeWorkId:number;

  // for swagger UI
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  profileImage?: any;
  
}
