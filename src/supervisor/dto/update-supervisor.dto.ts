import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateSupervisorDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsNumber()
  managerId?: number;

}