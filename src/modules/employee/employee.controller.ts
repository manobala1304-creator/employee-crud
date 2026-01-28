import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeTable } from './entity/employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // CREATE
  @Post('create')
  create(@Body() body: Partial<EmployeeTable>): Promise<EmployeeTable> {
    return this.employeeService.create(body);
  }

  // READ - all
  @Get()
  findAll(): Promise<EmployeeTable[]> {
    return this.employeeService.findAll();
  }

  // READ - by id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EmployeeTable> {
    return this.employeeService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<EmployeeTable>,
  ): Promise<EmployeeTable> {
    return this.employeeService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.employeeService.remove(id);
  }
}
