// @flow
/* eslint-disable no-console */

import path from 'path';
import express from 'express';

const PORT = process.env.PORT || 8090;
const app = express();
app.use(express.static(path.join(__dirname, '../build')));

app.get('/health', (req, res) => {
  return res.send('It works!');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server is running up on ${PORT}...`));
