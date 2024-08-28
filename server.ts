#!/usr/bin/env node

import { config } from './config/envConfig.js';

import app from './app/index.js';

import dotenv from 'dotenv';

dotenv.config();

const port = config.port || '3000';
app.set('port', port);

app.listen(port, () => {
    console.log(`PayNest app listening on PORT:${port}`);
})

