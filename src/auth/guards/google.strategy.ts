import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { oauthConstants } from '../auth.contstants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: oauthConstants.googleClientId,
      clientSecret: oauthConstants.googleClientSecret,
      callbackURL: oauthConstants.googleCallbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {

    if (!profile.emails || profile.emails.length === 0) {
    throw new Error('Google account has no email');
  }
    // Google user info
    const email = profile.emails[0].value;
    const name = profile.displayName;

    // Find or create user in DB
    const user = await this.authService.validateOAuthUser(email, name);

    return user; // becomes req.user
  }
}
