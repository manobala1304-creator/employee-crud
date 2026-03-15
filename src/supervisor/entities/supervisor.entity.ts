import { Manager } from '../../manager/entities/manager.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('supervisors')
export class Supervisor extends BaseEntity {
 
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  designation: string;

  

    //  ONE supervisor → MANY employees
  @OneToMany(() => Employee, employee => employee.supervisor)
  employees: Employee[];

  @ManyToOne(()=> Manager,manager => manager.supervisors)
  @JoinColumn({ name: 'managerId' }) 
  manager:Manager;

}


