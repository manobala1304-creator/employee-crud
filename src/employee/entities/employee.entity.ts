import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Supervisor } from '../../supervisor/entities/supervisor.entity';
import { JoinColumn } from 'typeorm';


@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
Empid: number;

  @Column()
  firstname: string;

  @Column()
  lastname:string

  @Column({ unique: true })
  email: string;

  @Column()
  department: string;

  @Column()
  Supid: number;

  //FOREIGN KEY 
  @ManyToOne(()=> Supervisor, supervisor=> supervisor.employees)
 @JoinColumn({ name: 'Supid' })   // FK column name
 supervisor: Supervisor;
}

