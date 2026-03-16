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

// Authentik OAuth config
export const oauthConstants2 = {
  authentikClientID: process.env.AUTHENTIK_CLIENT_ID,
  authentikClientSecret: process.env.AUTHENTIK_CLIENT_SECRET,
  authentikCallbackURL: process.env.AUTHENTIK_CALLBACK_URL,
  authentikTokenURL: process.env.AUTHENTIK_TOKEN_URL,
  authentikAuthorizationURL: process.env.AUTHENTIK_AUTH_URL,
};