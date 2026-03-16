import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Supervisor } from 'src/supervisor/entities/supervisor.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { EmployeeWork } from 'src/employee-work/entities/employee-work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee,Supervisor,Manager,EmployeeWork])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
