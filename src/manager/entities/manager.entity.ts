import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Supervisor } from '../../supervisor/entities/supervisor.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('manager')
export class Manager extends BaseEntity {

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  department: string;

  @OneToMany(() => Supervisor, supervisor => supervisor.manager)
  supervisors: Supervisor[];
}

