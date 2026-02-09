import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
 constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validationUser(email: string, password: string) {
    // STEP 1  Find user by email in database
    const user = await this.userRepository.findOne({
      where: { email },
    });

    // STEP 2  If user not found, stop login
    if (!user || !user.password) {
      return null;
    }

    // STEP 3  Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    // STEP 4  If password is wrong, stop login
    if (!isPasswordValid) {
      return null;
    }

    // STEP 5  Remove password before returning user
    const { password: _, ...result } = user;

    // STEP 6 Return user (goes to req.user)
    return result;
  }

  // now add the OAuth here
  async validateOAuthUser(email: string, name: string) {
  let user = await this.userRepository.findOne({ where: { email } });

  if (!user) {
    user = this.userRepository.create({
      email,
      name,
      
    });
    await this.userRepository.save(user);
  }

  return user;
}
   
   // JWT TOKEN CREATION

  async generateJwt(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


