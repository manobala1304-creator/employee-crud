import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
    return this.userRepo.save(dto);
  }

  findAll() {
    return this.userRepo.find();
  }

  update(id: number, dto: UpdateUserDto) {
    return this.userRepo.update(id, dto);
  }
}
