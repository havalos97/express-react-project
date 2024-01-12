require('dotenv').config(); 
import express from 'express';
import { healthcheck } from './controllers/main.controller';

const app = express();
const port = process.env.APP_PORT || 3000;

app.get('/api/healthcheck', healthcheck);

app.listen(port, () => {
  console.log(`Server running at http://${process.env.APP_HOST}:${port}`);
});
