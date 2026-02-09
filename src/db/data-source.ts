import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Employee } from '../employee/entities/employee.entity';
import { Supervisor } from '../supervisor/entities/supervisor.entity';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'mano',
  password: 'qwerty',
  database: 'krion6D demo project',
  entities: [User, Employee, Supervisor],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  options: {
    trustServerCertificate: true,
  },
});
