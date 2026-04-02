import { Controller, Get, Post, Body, UseInterceptors,UploadedFile, Param, Delete, Put, Patch, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { extname } from 'path';

@Controller('employee')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ADMIN,Role.MANAGER,Role.SUPERVISOR)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  
   @Post()
    createEmployee(@Body() body:CreateEmployeeDto) {
     return this.employeeService.create(body);
  }

  @Post('upload/:id')
@UseInterceptors(
  FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);           
      },
    }),
  }),
)
createEmployeeProfile(
  @Param('id') id: number,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.employeeService.uploadProfile(id, file);
}
   
   
@Get('all')
getAllEmployees(
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 5,
  @Query('search') search: string,
) {
  return this.employeeService.findAllEmployees(page, limit, search);
}

@Get(':id/detail')
getEmployeeById(@Param('id') id: number) {
  return this.employeeService.getEmployeeById(id);
}

@Patch(':id')
@UseInterceptors(
  FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + extname(file.originalname);
        cb(null, uniqueName);
      },
    }),
  }),
)
@ApiConsumes('multipart/form-data')   //  important to 
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      profileImage: {
        type: 'string',
        format: 'binary',
      },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      email: { type: 'string' },
    },
  },
})
updateEmployeeProfile(
  @Param('id') id: number,
  @Body() dto: UpdateEmployeeDto,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.employeeService.update(id, dto, file);
}
 
 @Put(':id')
updateEmployee(
  @Param('id') id: number,
  @Body() body: UpdateEmployeeDto
) {
  return this.employeeService.updateEmployee(id, body);
}


@Delete(':id')
deleteEmployee(@Param('id') id: number) {
  return this.employeeService.remove(id);
}

}