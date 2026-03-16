import { Employee } from "src/employee/entities/employee.entity";
import { Entity,Column,PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  SUPERVISOR = 'supervisor',
  EMPLOYEE = 'employee',
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true})
    email:string;

   @Column({
  type: 'varchar',
  length: 255,
  nullable: true, //  OAuth users won’t have passwords
})
password: string | null;

  @Column({
    type: 'varchar',
    enum: Role,
    default: Role.EMPLOYEE,
  })
  role: Role;


}

