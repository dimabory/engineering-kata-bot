
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
  GEMINI_MODEL: string;
}

const isDryRun = process.env.DRY_RUN === 'true';

const getEnv = (key: string, required: boolean = true): string => {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value || '';
};

export const config: Config = {
  GEMINI_API_KEY: getEnv('GEMINI_API_KEY', true), // Required for both dry-run and prod
  REDDIT_CLIENT_ID: getEnv('REDDIT_CLIENT_ID', !isDryRun),
  REDDIT_CLIENT_SECRET: getEnv('REDDIT_CLIENT_SECRET', !isDryRun),
  REDDIT_USERNAME: getEnv('REDDIT_USERNAME', !isDryRun),
  REDDIT_PASSWORD: getEnv('REDDIT_PASSWORD', !isDryRun),
  DRY_RUN: isDryRun,
  GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.5-pro',
};
