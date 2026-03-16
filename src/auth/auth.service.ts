import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/user/entities/user.entity';
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
   // validate the user
  async validationUser(email: string, password: string) {
    // Find user by email in database 
    const user = await this.userRepository.findOne({
      where: { email },
    });

    //  If user not found, stop login
    if (!user || !user.password) {
      return null;
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    // If password is wrong, stop login
    if (!isPasswordValid) {
      return null;
    }

    // Remove password before returning user
    const { password: _, ...result } = user;

    // Return user (goes to req.user)
    return result;
  }

  // now add the OAuth here
  async validateOAuthUser(email: string, name: string) {

  let user = await this.userRepository.findOne({
    where: { email }
  });

  if (!user) {
    user = this.userRepository.create({
      email,
      name,
      role: Role.EMPLOYEE
    });

    await this.userRepository.save(user);
  }

  return user;
}
   
   // JWT TOKEN CREATION

 async generateJwt(user: any) {

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role
  };

  const token = this.jwtService.sign(payload);

  const { password, ...safeUser } = user;

  return {
    message: "Login successful",
    token,
    user: safeUser
  };
}
}


