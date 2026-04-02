import { Delete, Injectable, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Supervisor } from 'src/supervisor/entities/supervisor.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { EmployeeWork } from 'src/employee-work/entities/employee-work.entity';
import * as fs from 'fs';
import * as path from 'path';


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

async uploadProfile(id: number, file: Express.Multer.File) {
  const employee = await this.employeeRepo.findOne({ where: { id } });

  if (!employee) {
    throw new NotFoundException('Employee not found');
  }

  employee.profileImage = file.filename;

  return this.employeeRepo.save(employee);
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
async update(id: number, dto: UpdateEmployeeDto, file: Express.Multer.File) {

  const employee = await this.employeeRepo.findOne({
    where: { id },
  });

  if (!employee) {
    throw new Error('Employee not found');
  }

  //  Delete old image
  if (file && employee.profileImage) {
    const oldPath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      employee.profileImage,
    );

    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  // Save new image
  if (file) {
    employee.profileImage = file.filename;
  }

  // Update other fields
  Object.assign(employee, dto);

  return await this.employeeRepo.save(employee);
}


async updateEmployee(id: number, body: UpdateEmployeeDto) {

  const employee = await this.employeeRepo.findOne({
    where: { id },
    relations: ['supervisor', 'employeeWork']
  });

  if (!employee) {
    throw new NotFoundException('Employee not found');
  }

  if (body.firstname) employee.firstname = body.firstname;
  if (body.lastname) employee.lastname = body.lastname;
  if (body.email) employee.email = body.email;
  if (body.department) employee.department = body.department;

  if (body.supId) {
    const supervisor = await this.supervisorepo.findOne({
      where: { id: body.supId }
    });

    if (!supervisor) {
      throw new NotFoundException('Supervisor not found');
    }

    employee.supervisor = supervisor;
  }

  if (body.employeeWorkId) {
    const employeeWork = await this.employeeWorkRepository.findOne({
      where: { id: body.employeeWorkId }
    });

    if (!employeeWork) {
      throw new NotFoundException('EmployeeWork not found');
    }

    employee.employeeWork = employeeWork;
  }

  return await this.employeeRepo.save(employee);
}


async findAllEmployees(page: number = 1, limit: number = 5, search?: string) {
  page = Number(page) || 1;
  limit = Number(limit) || 5;

  const skip = (page - 1) * limit;

  //  FETCH WITH PAGINATION
  const [employees, total] = await this.employeeRepo.findAndCount({
    relations: [
      'supervisor',
      'supervisor.manager',
      'employeeWork',
    ],
    where: search
      ? [
          { firstname: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
        ]
      : {},
    skip: skip,
    take: limit,
  });

  // YOUR EXISTING MAP 
  const data = employees.map((emp) => ({
    id: emp.id,
    name: emp.firstname,
    department: emp.department,

    profileImageUrl: emp.profileImage
      ? `http://localhost:3004/uploads/${emp.profileImage}`
      : null,

    employee_work: emp.employeeWork
      ? {
          id: emp.employeeWork.id,
          title: emp.employeeWork.title,
          status: emp.employeeWork.status,
        }
      : null,

    supervisor: emp.supervisor
      ? {
          id: emp.supervisor.id,
          name: emp.supervisor.name,
          designation: emp.supervisor.designation,
        }
      : null,

    manager: emp.supervisor?.manager
      ? {
          id: emp.supervisor.manager.id,
          name: emp.supervisor.manager.name,
          department: emp.supervisor.manager.department,
        }
      : null,
  }));

  //  RESPONSE
  return {
    success: true,
    message: 'Employees fetched successfully',
    total,
    page,
    limit,
    data,
  };
}


remove( id:number ) {
  return this.employeeRepo.delete(id)
}



}
