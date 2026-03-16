import { Get, Injectable, NotFoundException, Post, Put } from '@nestjs/common';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { Repository } from 'typeorm';
import { Supervisor } from './entities/supervisor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from 'src/manager/entities/manager.entity';

@Injectable()
export class SupervisorService {

  constructor(
    @InjectRepository(Supervisor)
    private readonly supervisorRepo: Repository<Supervisor>,

    @InjectRepository(Manager)
    private readonly managerRepo: Repository<Manager>,
  ) {}



  // CREATE SUPERVISOR
  async create(body: CreateSupervisorDto) {

    const manager = await this.managerRepo.findOne({
      where: { id: body.managerId }
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    const supervisor = this.supervisorRepo.create({
      name: body.name,
      email: body.email,
      designation: body.designation,
      manager
    });

    return await this.supervisorRepo.save(supervisor);
  }



  // GET SUPERVISOR BY ID
  async getSupervisorById(id: number) {

    const supervisor = await this.supervisorRepo.findOne({
      where: { id },
      relations: [
        'manager',
        'employees'
      ]
    });

    if (!supervisor) {
      throw new NotFoundException(`Supervisor with ID ${id} not found`);
    }

    return {

      supervisor: {
        id: supervisor.id,
        name: supervisor.name,
        email: supervisor.email,
        designation: supervisor.designation
      },

      manager: supervisor.manager
        ? {
            id: supervisor.manager.id,
            name: supervisor.manager.name,
            email: supervisor.manager.email,
            department: supervisor.manager.department
          }
        : null,

      employees: supervisor.employees
        ? supervisor.employees.map(emp => ({
            id: emp.id,
            name: emp.firstname,
            department: emp.department
          }))
        : []

    };
  }



  // UPDATE  SUPERVISOR
  async updateSupervisor(id: number, body: UpdateSupervisorDto) {

  const supervisor = await this.supervisorRepo.findOne({
    where: { id },
    relations: ['manager']
  });

  if (!supervisor) {
    throw new NotFoundException('Supervisor not found');
  }

  if (body.name) supervisor.name = body.name;
  if (body.email) supervisor.email = body.email;
  if (body.designation) supervisor.designation = body.designation;

  if (body.managerId) {

    const manager = await this.managerRepo.findOne({
      where: { id: body.managerId }
    });

    if (!manager) {
      throw new NotFoundException('Manager not found');
    }

    supervisor.manager = manager;
  }

  return await this.supervisorRepo.save(supervisor);
}



  // GET ALL SUPERVISORS
  async getAllSupervisors() {

    const supervisors = await this.supervisorRepo.find({
      relations: [
        'manager',
        'employees'
      ]
    });

    return supervisors.map(supervisor => ({

      id: supervisor.id,
      name: supervisor.name,
      email: supervisor.email,
      designation: supervisor.designation,

      manager: supervisor.manager
        ? {
            id: supervisor.manager.id,
            name: supervisor.manager.name,
            department: supervisor.manager.department
          }
        : null,

      employees: supervisor.employees
        ? supervisor.employees.map(emp => ({
            id: emp.id,
            name: emp.firstname,
            department: emp.department
          }))
        : []

    }));
  }



  // DELETE SUPERVISOR
  async remove(id: number) {

    const supervisor = await this.supervisorRepo.findOne({
      where: { id }
    });

    if (!supervisor) {
      throw new NotFoundException('Supervisor not found');
    }

    return await this.supervisorRepo.delete(id);
  }

}



   



