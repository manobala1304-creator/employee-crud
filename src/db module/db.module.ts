import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
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
      entities: [User],
      //synchronize:true,
      options: {
        trustServerCertificate: true,
      },
    };
  }
}
