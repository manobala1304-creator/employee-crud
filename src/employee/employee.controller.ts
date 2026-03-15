import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { EmployeeWork } from 'src/employee-work/entities/employee-work.entity';


@Controller('employee')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ADMIN,Role.MANAGER,Role.SUPERVISOR)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  
   @Post()
    createEmployee(@Body() body:CreateEmployeeDto) {
     return this.employeeService.create(body);
  }
   
   
@Get('all')
getAllEmployees() {
  return this.employeeService.findAllEmployees();
}

@Get(':id/detail')
getEmployeeById(@Param('id') id: number) {
  return this.employeeService.getEmployeeById(id);
}
 
 @Put(':id')
 updateEmployee(
  @Param('id') id: number,
  @Body('employeeWorkId') EmployeeWork:number,
) {
  return this.employeeService.updateEmployeeWork(id, EmployeeWork);
}


@Delete(':id')
deleteEmployee(@Param('id') id: number) {
  return this.employeeService.remove(id);
}

}