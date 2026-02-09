import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";


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


}

