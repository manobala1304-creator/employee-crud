import { Controller,UseGuards,Req, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './entities/user.entity';
import { UpdateRoleDto } from './dto/update_role.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
 @UseGuards(JwtAuthGuard,RolesGuard)
 @Roles(Role.ADMIN)
  @Get('all_users')
  findall(){
    return this.userService.findAll()
  } 

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)   //  Only admin can change roles
@Patch(':id/role')
updateRole(
  @Param('id') id: string,
  @Body() dto: UpdateRoleDto,
) {
  return this.userService.updateRole(+id, dto.role);
}

  // public routes
  @Post()
  create(@Body()dto: CreateUserDto) {
    return this.userService.create(dto);
  }


  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }
  
@ApiBearerAuth()
 @UseGuards(JwtAuthGuard,RolesGuard)
 @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id') id: number){
    return this.userService.remove(id)
  }
  
}


