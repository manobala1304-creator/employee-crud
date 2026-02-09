import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';

@Controller('supervisors')
@UseGuards(JwtAuthGuard)
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Post()
createSupervisor(@Body() body: CreateSupervisorDto) {
  return this.supervisorService.create(body);
}

 @Patch(':id')
updateSupervisor(
  @Param('id') id: number,
  @Body() body: UpdateSupervisorDto,
) {
  return this.supervisorService.update(id, body);
}


@Get('all')
getAllSupervisors() {
  return this.supervisorService.getAllSupervisors();
}

@Get(':id')
getsupid(@Param('id') id:number){
  return this.supervisorService.getsupid(id);
}


  @Delete(':id')
  deleteSupervisor(@Param('id') id: number) {
    return this.supervisorService.remove(id);
  }
}
