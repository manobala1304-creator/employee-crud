import { Delete, Injectable, Param, Post, UseGuards } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
//import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {}
  @Post()
  async create(body: CreateEmployeeDto) {
  const employee = this.employeeRepo.create(body);
  return this.employeeRepo.save(employee);
}

  findAll(id: number) {
  return this.employeeRepo.find({
    where: { Empid:id },
    relations: ['supervisor'],
  });
}


  update(id: number, body: UpdateEmployeeDto) {
  return this.employeeRepo.update(id, body);
}

  findAllEmployees() {
  return this.employeeRepo.find({
    relations: ['supervisor'],
  });
}

remove( id:number ) {
  return this.employeeRepo.delete(id)
}



}
