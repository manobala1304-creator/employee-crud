import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateEmployeeDto {

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsNumber()
  supId?: number;

  @IsOptional()
  @IsNumber()
  employeeWorkId?: number;
}