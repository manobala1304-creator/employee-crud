import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeWorkDto } from './create-employee-work.dto';
import { isNumber } from 'class-validator';

export class UpdateEmployeeWorkDto extends PartialType(CreateEmployeeWorkDto) {}



