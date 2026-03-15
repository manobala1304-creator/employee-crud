import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('supervisors')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(Role.ADMIN,Role.MANAGER)
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Post()
createSupervisor(@Body() body: CreateSupervisorDto) {
  return this.supervisorService.create(body);
}

 @Put(':id/manager')
updateManager(
  @Param('id') id: number,
  @Body('managerId') managerId: number
) {
  return this.supervisorService.updateManager(id, managerId);
}


@Get('all')
getAllSupervisors() {
  return this.supervisorService.getAllSupervisors();
}

@Delete(':id')
remove(@Param('id') id: number) {
  return this.supervisorService.remove(id);
}
}
