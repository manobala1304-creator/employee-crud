import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeWork } from './entities/employee-work.entity';
import { CreateEmployeeWorkDto } from './dto/create-employee-work.dto';
import { UpdateEmployeeWorkDto } from './dto/update-employee-work.dto';

@Injectable()
export class EmployeeWorkService {
  constructor(
    @InjectRepository(EmployeeWork)
    private readonly employeeWorkRepository: Repository<EmployeeWork>,
  ) {}

  
  async create(createEmployeeWorkDto: CreateEmployeeWorkDto) {
    const work = this.employeeWorkRepository.create(createEmployeeWorkDto);
    return await this.employeeWorkRepository.save(work);
  }

 
  async findAll() {
    return await this.employeeWorkRepository.find({
      relations: ['employee'], // if relation exists
    });
  }

  
  async findOne(id: number) {
    const work = await this.employeeWorkRepository.findOne({
      where: { id },
      relations: ['employee'],
    });

    if (!work) {
      throw new NotFoundException(`EmployeeWork with ID ${id} not found`);
    }

    return work;
  }

  
  async update(id: number, updateEmployeeWorkDto: UpdateEmployeeWorkDto) {
     const work = await this.findOne(id);

     Object.assign(work, updateEmployeeWorkDto);

    return this.employeeWorkRepository.update(id, updateEmployeeWorkDto);

     return await this.employeeWorkRepository.save(work);
  }

  
  async remove(id: number) {
    const work = await this.findOne(id);
    return await this.employeeWorkRepository.remove(work);
  }
}
