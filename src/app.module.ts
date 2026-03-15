import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './db/db.module';
import { EmployeeModule } from './employee/employee.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { ManagerModule } from './manager/manager.module';
import { EmployeeWorkModule } from './employee-work/employee-work.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true,
    }),
     TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
     UserModule,
    EmployeeModule,
    SupervisorModule,
    ManagerModule,
    EmployeeWorkModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
