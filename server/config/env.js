import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/indusmind_db',
  jwtSecret: process.env.JWT_SECRET || 'indusmind_super_secret_jwt_key_998124',
  jwtExpire: process.env.JWT_EXPIRE || '1d',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'indusmind_refresh_secret_key_8892',
  jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE || '7d',
  geminiApiKey: process.env.GEMINI_API_KEY || 'mock_key',
  chromaUrl: process.env.CHROMA_URL || 'http://localhost:8000',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};
