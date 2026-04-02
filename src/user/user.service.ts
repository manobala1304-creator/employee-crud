import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    // return this.userRepo.save(dto);
    const createUser = new User();
    createUser.name = dto.name;
    createUser.email = dto.email;
    createUser.role = dto.role;
    createUser.password = await bcrypt.hash(dto.password, 10);
    
   return await this.userRepo.save(createUser);
  }

  //UPDATE THE ROLE
  async updateRole(id: number, role: Role) {
  const user = await this.userRepo.findOne({
    where: { id },
  });

  if (!user) {
    throw new Error('User not found');
  }

  user.role = role;

  return this.userRepo.save(user);
}


  findAll() {
    return this.userRepo.find();
  }

 

async update(id: number, updateUserDto: UpdateUserDto) {

  const user = await this.userRepo.findOne({ where: { id } });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  // important Hash password if it exists
  if (updateUserDto.password) {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    updateUserDto.password = hashedPassword;
  }

  // Merge updated data
  Object.assign(user, updateUserDto);

  return await this.userRepo.save(user);
}

  remove(id:number){
    return this.userRepo.delete(id)
  }

}

