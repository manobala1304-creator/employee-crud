import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Supervisor } from '../../supervisor/entities/supervisor.entity';
import { JoinColumn } from 'typeorm';
import { EmployeeWork } from '../../employee-work/entities/employee-work.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('employees')
export class Employee  extends BaseEntity{

  @Column()
  firstname: string;

  @Column()
  lastname:string

  @Column({ unique: true })
  email: string;

  @Column()
  department: string;

  @Column({ nullable: true })
  profileImage: string;

  
  //FOREIGN KEY 
  @ManyToOne(()=> Supervisor, supervisor=> supervisor.employees)
 @JoinColumn({ name: 'Supid' })   // FK column name
 supervisor: Supervisor;
 //add emp work to employee
 @ManyToOne(() => EmployeeWork, work => work.employees)
@JoinColumn({ name: 'employeeWorkId' })
employeeWork: EmployeeWork;


}

