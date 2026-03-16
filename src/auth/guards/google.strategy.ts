import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { oauthConstants } from '../auth.contstants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
 
    super({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['email', 'profile'],
});
   
  }
 
  async validate(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
) {

  const email = profile.emails[0].value;
  const name = profile.displayName;

  const user = await this.authService.validateOAuthUser(email, name);

  return user; // DB user
}
  
}
