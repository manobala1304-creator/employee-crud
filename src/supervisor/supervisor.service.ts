import { Get, Injectable, Post, Put } from '@nestjs/common';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { Repository } from 'typeorm';
import { Supervisor } from './entities/supervisor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SupervisorService {
  constructor(
    @InjectRepository(Supervisor)
    private readonly supervisorRepo: Repository<Supervisor>,
  ) {}

    async create(body: CreateSupervisorDto) {
  const supervisor = this.supervisorRepo.create(body);
  return this.supervisorRepo.save(supervisor);
}

   update(id: number, body: UpdateSupervisorDto) {
  return this.supervisorRepo.update(id, body);
}
   
 async getAllSupervisors() {
    return this.supervisorRepo.find({
      relations: ['employees'], // correct relation name
    });
}

getsupid(id:number){
  return this.supervisorRepo.findOne({
    where: {Supid:id},
    relations :['employees'],
  });
}

remove(id: number){
  return this.supervisorRepo.delete(id);
}



   
}


