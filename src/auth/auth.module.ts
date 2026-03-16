import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
import { LocalStrategy } from './guards/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './auth.contstants';
import { GoogleStrategy } from './guards/google.strategy';
import { AuthentikStrategy } from './guards/authentik.strategy';
 @Module({
  imports: [TypeOrmModule.forFeature([User]),UserModule, PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '2d' },
  }),
],

  controllers: [AuthController],
   providers: [AuthService,JwtStrategy,LocalStrategy,GoogleStrategy,AuthentikStrategy],
   exports: [
    PassportModule, //  required
    JwtModule,      //  required
  ],
 })
 export class AuthModule {}
