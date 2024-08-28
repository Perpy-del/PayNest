import dotenv from 'dotenv';
dotenv.config();
import { development } from './development.js';
import { production } from './production.js';
import { staging } from './staging.js';

const environment = process.env.NODE_ENV;

let config: Record<string, any>;

if (!environment) throw new Error('No environment setup');

// Logging to the console to indicate the environment
console.log(`server setup to ${environment}!!!👨‍💻`);

if (environment.trim() === 'development') {
  config = { ...development };
} else if (environment.trim() === 'staging') {
  config = { ...staging };
} else {
  config = { ...production };
}

export { config };
