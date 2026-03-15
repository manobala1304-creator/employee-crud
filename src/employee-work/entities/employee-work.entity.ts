import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class EmployeeWork extends BaseEntity{

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'pending' })
  status: string;

  

 

  @OneToMany(() => Employee, employee => employee.employeeWork)
employees: Employee[];

}

