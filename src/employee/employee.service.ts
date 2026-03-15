import { Delete, Injectable, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
//import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
//import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Supervisor } from 'src/supervisor/entities/supervisor.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { EmployeeWork } from 'src/employee-work/entities/employee-work.entity';
import e from 'express';
import { title } from 'process';
import { promises } from 'dns';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
    @InjectRepository(Supervisor)
    private supervisorepo: Repository<Supervisor>,
    @InjectRepository(Manager)
    private managerrepo: Repository<Manager>,
    @InjectRepository(EmployeeWork)
    private employeeWorkRepository: Repository<EmployeeWork>,

  ) {}
 @Post()
  async create(body: CreateEmployeeDto) {
  const supervisor = await this.supervisorepo.findOne({
    where: { id: body.Supid },
  });

  if (!supervisor) {
    throw new NotFoundException('Supervisor not found');
  }

  const employeeWork = await this.employeeWorkRepository.findOne({
  where: { id: body.employeeWorkId },
});

if (!employeeWork) {
  throw new NotFoundException('Employee Work not found');
}

const employee = this.employeeRepo.create({
  firstname: body.firstname,
  lastname: body.lastname,
  email: body.email,
  department: body.department,
  supervisor,
  employeeWork
});

return await this.employeeRepo.save(employee);

}

async getEmployeeById(id: number) {
const employee = await this.employeeRepo.findOne({
  where: { id },
  relations: [
    'supervisor',
    'supervisor.manager',
    'employeeWork'
  ]
});

if (!employee) {
  throw new NotFoundException(`Employee with ID ${id} not found`);
}

return {
  employee: {
    id: employee.id,
    name: employee.firstname,
    department: employee.department
  },

  supervisor: employee.supervisor
    ? {
        id: employee.supervisor.id,
        name: employee.supervisor.name,
        designation: employee.supervisor.designation
      }
    : null,

  employee_work: employee.employeeWork
    ? {
        id: employee.employeeWork.id,
        title: employee.employeeWork.title,
        status: employee.employeeWork.status
      }
    : null,

  manager: employee.supervisor?.manager
    ? {
        id: employee.supervisor.manager.id,
        name: employee.supervisor.manager.name,
        email: employee.supervisor.manager.email,
        department: employee.supervisor.manager.department
      }
    : null
};

}


 async updateEmployeeWork(id: number, employeeWorkId: number) {

const employee = await this.employeeRepo.findOne({
  where: { id },
});

if (!employee) {
  throw new NotFoundException('Employee not found');
}

const employeeWork = await this.employeeWorkRepository.findOne({
  where: { id: employeeWorkId },
});

if (!employeeWork) {
  throw new NotFoundException('EmployeeWork not found');
}

employee.employeeWork = employeeWork;

return await this.employeeRepo.save(employee);
}


async findAllEmployees() {

const employees = await this.employeeRepo.find({
  relations: [
    'supervisor',
    'supervisor.manager',
    'employeeWork'
  ]
});

return employees.map(emp => ({
  id: emp.id,
  name: emp.firstname,
  department: emp.department,

  employee_work: emp.employeeWork
    ? {
        id: emp.employeeWork.id,
        title: emp.employeeWork.title,
        status: emp.employeeWork.status
      }
    : null,

  supervisor: emp.supervisor
    ? {
        id: emp.supervisor.id,
        name: emp.supervisor.name,
        designation: emp.supervisor.designation
      }
    : null,

  manager: emp.supervisor?.manager
    ? {
        id: emp.supervisor.manager.id,
        name: emp.supervisor.manager.name,
        department: emp.supervisor.manager.department
      }
    : null
}));

}


remove( id:number ) {
  return this.employeeRepo.delete(id)
}



}
