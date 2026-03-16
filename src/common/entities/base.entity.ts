import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
//can't use directly,only for inheritance
export abstract class BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  //auto inserts current data when record is created
  @CreateDateColumn({ type: 'datetime2' })
  createdAt: Date;
 
  // auto update date when record is created
  @UpdateDateColumn({ type: 'datetime2' })
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}