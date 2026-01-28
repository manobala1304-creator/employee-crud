import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeTable } from './entity/employee.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([EmployeeTable])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
