#!/usr/bin/env node

import app from './app/index.js';

import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
    console.log(`PayNest app listening on PORT:${port}`);
})

