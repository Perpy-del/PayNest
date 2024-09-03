#!/usr/bin/env node

import env from './config/env.js';

import app from './app/index.js';

import dotenv from 'dotenv';

dotenv.config();

const port = env.port || '3000';
app.set('port', port);

app.listen(port, () => {
  console.log(`PayNest app listening on PORT:${port}`);
});
