import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supervisor } from './entities/supervisor.entity';
import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Supervisor])],
  providers: [SupervisorService],
  controllers: [SupervisorController],
})
export class SupervisorModule {}

