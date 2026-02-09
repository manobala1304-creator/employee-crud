import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
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
    createUser.password = await bcrypt.hash(dto.password, 10);
    
   return await this.userRepo.save(createUser);
  }

  findAll() {
    return this.userRepo.find();
  }

  update(id: number, dto: UpdateUserDto) {
    return this.userRepo.update(id, dto);
  }

  remove(id:number){
    return this.userRepo.delete(id)
  }
}

