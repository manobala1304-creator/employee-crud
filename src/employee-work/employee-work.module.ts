import { Module } from '@nestjs/common';
import { EmployeeWorkService } from './employee-work.service';
import { EmployeeWorkController } from './employee-work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeWork } from './entities/employee-work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeWork])],
  controllers: [EmployeeWorkController],
  providers: [EmployeeWorkService],
})
export class EmployeeWorkModule {}

