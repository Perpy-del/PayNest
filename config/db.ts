import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);
async function getPgVersion() {
  const result = await sql`SELECT version()`;
  console.log(result[0]);
}

export { getPgVersion };
