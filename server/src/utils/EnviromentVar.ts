import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export const ENV = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase',
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'sajal_nbhvugcyftxdzrsdxtfcghvjbkl',
};
