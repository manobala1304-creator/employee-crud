import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    // local login 
    @UseGuards(LocalAuthGuard)
@Post('login')
login(@Req() req) {
  return this.authService.generateJwt(req.user);
}
  // google login
 @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // Passport will automatically redirect to Google
  }

  //  Google callback
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req) {
    return this.authService.generateJwt(req.user); // req.user comes from GoogleStrategy.validate()
  }

}
