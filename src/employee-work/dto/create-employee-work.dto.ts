import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEmployeeWorkDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  status: string;

 
}
