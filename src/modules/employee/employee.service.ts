import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeTable } from './entity/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeTable)
    private readonly employeeRepo: Repository<EmployeeTable>,
  ) {}

  // CREATE
  async create(employee: Partial<EmployeeTable>): Promise<EmployeeTable> {
    const newEmployee = this.employeeRepo.create(employee);
    return await this.employeeRepo.save(newEmployee);
  }

  // READ - all
  async findAll(): Promise<EmployeeTable[]> {
    return await this.employeeRepo.find();
  }

  // READ - by id
  async findOne(id: number): Promise<EmployeeTable> {
    const employee = await this.employeeRepo.findOne({
      where: { employeeId: id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  // UPDATE
  async update(id: number, data: Partial<EmployeeTable>): Promise<EmployeeTable> {
    const employee = await this.findOne(id);
    Object.assign(employee, data);
    return await this.employeeRepo.save(employee);
  }

  // DELETE
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.employeeRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return { message: 'Employee deleted successfully' };
  }
}
