import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Manager } from './entities/manager.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manager]), 
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
