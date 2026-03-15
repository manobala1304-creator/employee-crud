import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { Oauthconstants2 } from '../auth.contstants';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthentikStrategy extends PassportStrategy(OAuth2Strategy, 'authentik') {
  constructor(private authService:AuthService) {
    super({
      authorizationURL:Oauthconstants2.authentikauthorizationURL,
      tokenURL: Oauthconstants2.authentiktokenURL,
      clientID: Oauthconstants2.authentikclientID,
      clientSecret: Oauthconstants2.authentikclientSecret,
      callbackURL: Oauthconstants2.authentikcallbackURL,
      scope: ['openid','profile','email']
    });
  }

async validate(accessToken: string): Promise<any> {

  const response = await fetch(
    "http://localhost:9000/application/o/userinfo/",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const profile = await response.json();

  console.log("Authentik userinfo:", profile);

  const email = profile.email;
  const name = profile.name || profile.preferred_username;

  return {
    profile: {
      email,
      name,
    },
  };
}
}