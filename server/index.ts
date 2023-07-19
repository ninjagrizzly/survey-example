import express from 'express';
import dotenv from 'dotenv';

import POLLS from './polls';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/api/poll/:slug', (req, res) => {
  res.json(POLLS['11']);
});

app.post('/api/poll/:slug/answer', (req, res) => {
  res.json({status: 'OK'});
});

app.post('/api/poll/:slug/finish', (req, res) => {
  res.json({status: 'OK'});
});

app.post('/api/poll/:slug/stats', (req, res) => {
  res.json({status: 'OK'});
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
