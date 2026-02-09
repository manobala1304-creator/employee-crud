// JWT config
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

// Google OAuth config
export const oauthConstants = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackURL: process.env.GOOGLE_CALLBACK_URL,
};
