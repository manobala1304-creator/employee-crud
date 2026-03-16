import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { EmployeeWork } from "src/employee-work/entities/employee-work.entity";
import { Employee } from "src/employee/entities/employee.entity";
import { Manager } from "src/manager/entities/manager.entity";
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
      password: 'Mano@2003',
      database: 'krion6D demo project',
      entities: [User,Employee,Supervisor,Manager,EmployeeWork],
      synchronize:false,
      options: {
        trustServerCertificate: true,
      },
    };
  }
}
