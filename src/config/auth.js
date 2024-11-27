// src/config/auth.js
require('dotenv').config();

module.exports = {
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
    validateIssuer: false,
    validateAudience: false,
    validateExpiresIn: true,
  },
};