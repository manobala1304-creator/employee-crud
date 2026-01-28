import { Injectable } from '@nestjs/common';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';
import { EmployeeTable } from '../employee/entity/employee.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'mano',
      password: 'qwerty',
      database: 'krion6D demo project',
      entities: [EmployeeTable,User],
      synchronize:true,
      options: {
        trustServerCertificate: true,
      },
    };
  }
}
