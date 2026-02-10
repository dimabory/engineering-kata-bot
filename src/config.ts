
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface Config {
  GEMINI_API_KEY: string;
  REDDIT_CLIENT_ID: string;
  REDDIT_CLIENT_SECRET: string;
  REDDIT_USERNAME: string;
  REDDIT_PASSWORD: string;
  DRY_RUN: boolean;
}

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config: Config = {
  GEMINI_API_KEY: getEnv('GEMINI_API_KEY'),
  REDDIT_CLIENT_ID: getEnv('REDDIT_CLIENT_ID'),
  REDDIT_CLIENT_SECRET: getEnv('REDDIT_CLIENT_SECRET'),
  REDDIT_USERNAME: getEnv('REDDIT_USERNAME'),
  REDDIT_PASSWORD: getEnv('REDDIT_PASSWORD'),
  DRY_RUN: process.env.DRY_RUN === 'true',
};
