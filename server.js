
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }   // permite conectarse desde cualquier página
});

let score = 0;

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.emit('updateScore', score);   // le manda el score actual al que entra

    socket.on('updateScore', (newScore) => {
        score = newScore;
        io.emit('updateScore', score);   // avisa a todos
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo');
});