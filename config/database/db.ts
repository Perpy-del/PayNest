import knex from "knex";
import dotenv from 'dotenv';
import config from './knexfile.js';

dotenv.config();

const db = knex(config);
export default db;
