const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    setInterval(() => {
        io.emit('scoreUpdate', Math.floor(Math.random() * 100));
    }, 1000);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
