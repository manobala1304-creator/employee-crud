import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Employee } from "src/employee/entities/employee.entity";
import { Supervisor } from "src/supervisor/entities/supervisor.entity";
import { User } from "src/user/entities/user.entity";

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
      entities: [User,Employee,Supervisor],
      synchronize:false,
      options: {
        trustServerCertificate: true,
      },
    };
  }
}
