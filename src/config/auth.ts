// src/config/auth.ts
import { config } from 'dotenv';

config();

export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_key_change_this',
    expiresIn: process.env.JWT_EXPIRATION || '24h',
  },
  
  // Password hashing configuration
  hash: {
    saltRounds: 10,
  },

  // Authentication middleware configuration
  middleware: {
    // Routes that don't require authentication
    publicPaths: [
      '/api/auth/login',
      '/api/auth/register',
      '/api/health',
    ],
  },

  // Token validation options
  tokenValidation: {
    // Whether to validate the token's issuer
    validateIssuer: false,
    // Whether to validate the token's audience
    validateAudience: false,
    // Whether to validate the token's expiration
    validateExpiresIn: true,
  },
};