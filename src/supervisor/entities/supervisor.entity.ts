import { Employee } from '../../employee/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity('supervisors')
export class Supervisor {
  @PrimaryGeneratedColumn()
  Supid: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  designation: string;

 


    //  ONE supervisor → MANY employees
  @OneToMany(() => Employee, employee => employee.supervisor)
  employees: Employee[];

}


