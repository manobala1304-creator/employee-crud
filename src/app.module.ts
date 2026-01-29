import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './modules/db-module/db.module';
import { EmployeeTable } from './modules/employee/entity/employee.entity';
import { ValidationPipe } from '@nestjs/common';
import { User } from './modules/user/entity/user.entity';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    EmployeeModule,
    UserModule],
  })



@Module({
  imports: [TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
