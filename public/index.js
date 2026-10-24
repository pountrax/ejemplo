const express = require('express');
const { createServer } = require('node:http');

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>');
});

server.listen(3000, () => {
  console.log('servidor corriendo en http://localhost:3000');
});