require('dotenv').config();

const env = process.env;

const config = {
  port: env.PORT || 3000,
  nodeEnv: env.NODE_ENV || 'development',
  databasePath: env.DATABASE_PATH || './quotes.db',
  listPerPage: parseInt(env.LIST_PER_PAGE) || 20,
  apiBaseUrl: env.API_BASE_URL || 'http://localhost:3000',
  frontendUrl: env.FRONTEND_URL || 'http://localhost:1234',
  rateLimitWindowMs: parseInt(env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  rateLimitMaxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS) || 100,
  jwtSecret: env.JWT_SECRET || 'fallback-secret-change-in-production',
  cacheTtl: parseInt(env.CACHE_TTL) || 300,
  redisUrl: env.REDIS_URL || 'redis://localhost:6379',
};

module.exports = config;
