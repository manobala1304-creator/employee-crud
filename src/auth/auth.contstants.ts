
// JWT config
export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'my-secret-key',
};


// Google OAuth config
export const oauthConstants = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
};


// Authentik OAuth2 config
export const Oauthconstants2 = {
  authentikclientID: process.env.AUTHENTIK_CLIENT_ID,
  authentikclientSecret: process.env.AUTHENTIK_CLIENT_SECRET,
  authentikcallbackURL: process.env.AUTHENTIK_CALLBACK_URL,
  authentiktokenURL: process.env.AUTHENTIK_TOKEN_URL,
  authentikauthorizationURL: process.env.AUTHENTIK_AUTH_URL,
};