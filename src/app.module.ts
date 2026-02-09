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

@Module({
  imports: [TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
     UserModule,
    EmployeeModule,
    SupervisorModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
