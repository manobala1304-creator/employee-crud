import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { EmployeeWorkService } from './employee-work.service';
import { CreateEmployeeWorkDto } from './dto/create-employee-work.dto';
import { UpdateEmployeeWorkDto } from './dto/update-employee-work.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('employee-work')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ADMIN,Role.MANAGER,Role.SUPERVISOR)

export class EmployeeWorkController {
  constructor(private readonly employeeWorkService: EmployeeWorkService) {}

  @Post()
  create(@Body() createEmployeeWorkDto: CreateEmployeeWorkDto) {
    return this.employeeWorkService.create(createEmployeeWorkDto);
  }
  @Roles(Role.EMPLOYEE)
  @Get()
  findAll() {
    return this.employeeWorkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeWorkService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateEmployeeWorkDto: UpdateEmployeeWorkDto) {
    return this.employeeWorkService.update(id, updateEmployeeWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeWorkService.remove(+id);
  }
}
