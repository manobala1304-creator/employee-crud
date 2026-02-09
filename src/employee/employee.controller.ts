import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';


@Controller('employee')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

   @Post()
  createEmployee(@Body() body:CreateEmployeeDto) {
    return this.employeeService.create(body);
  }
   
   
   @Get('all')
   findAllEmployees() {
     return this.employeeService.findAllEmployees();
}

 
  @Get(':id')
  getEmployees(@Param('id')id:number) {
    return this.employeeService.findAll(id);
  }
 
 @Put(':id')
 updateEmployee(
  @Param('id') id: number,
  @Body() body: UpdateEmployeeDto,
) {
  return this.employeeService.update(id, body);
}


@Delete(':id')
deleteEmployee(@Param('id') id: number) {
  return this.employeeService.remove(id);
}

}