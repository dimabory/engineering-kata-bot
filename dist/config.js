"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const getEnv = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};
exports.config = {
    GEMINI_API_KEY: getEnv('GEMINI_API_KEY'),
    REDDIT_CLIENT_ID: getEnv('REDDIT_CLIENT_ID'),
    REDDIT_CLIENT_SECRET: getEnv('REDDIT_CLIENT_SECRET'),
    REDDIT_USERNAME: getEnv('REDDIT_USERNAME'),
    REDDIT_PASSWORD: getEnv('REDDIT_PASSWORD'),
    DRY_RUN: process.env.DRY_RUN === 'true',
};
