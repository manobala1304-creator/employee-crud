import { Controller,UseGuards,Req, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // protected route
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {  
    return {
      message: 'Protected route',
      user: req.user,
    };
  }

  // public route
  @Post()
  create(@Body()dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  } 
 
  @Delete(':id')
  delete(@Param('id') id: number){
    return this.userService.remove(id)
  }
  
}


