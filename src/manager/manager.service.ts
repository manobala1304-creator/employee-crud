import { Body, Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
  constructor( 
    @InjectRepository(Manager)
    private managerrepo:Repository<Manager>,
  ){}
  async create(createManagerDto: CreateManagerDto) {
  const manager = this.managerrepo.create(createManagerDto);
  return await this.managerrepo.save(manager);
}

async findAll() {
  return await this.managerrepo.find();
}

async findOne(id: number) {
  const manager = await this.managerrepo.findOne({
    where: { id },
  });

  if (!manager) {
    throw new Error('Manager not found');
  }
  return manager;
}

async update(id: number, updateManagerDto: UpdateManagerDto) {
  const manager = await this.managerrepo.findOne({
    where: { id },
  });

  if (!manager) {
    throw new Error('Manager not found');
  }
  return this.managerrepo.save(manager);
}

async remove(id: number) {
  const manager = await this.managerrepo.findOne({
    where: { id },
  });

  if (!manager) {
    throw new Error('Manager not found');
  }

  await this.managerrepo.remove(manager);

  return { message: 'Manager deleted successfully' };
}
}
