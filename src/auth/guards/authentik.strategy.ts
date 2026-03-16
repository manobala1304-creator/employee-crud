import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { oauthConstants2 } from '../auth.contstants';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthentikStrategy extends PassportStrategy(OAuth2Strategy, 'authentik') {
  constructor(private authService:AuthService) {
 super({
   authorizationURL: process.env.AUTHENTIK_AUTH_URL,
   tokenURL: process.env.AUTHENTIK_TOKEN_URL,
   clientID: process.env.AUTHENTIK_CLIENT_ID,
   clientSecret: process.env.AUTHENTIK_CLIENT_SECRET,
   callbackURL: process.env.AUTHENTIK_CALLBACK_URL,
   scope: ['openid', 'profile', 'email'],
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

  // create or find user in DB
  const user = await this.authService.validateOAuthUser(email, name);

  return user;   // return DB user
}
}