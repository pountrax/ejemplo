const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando 🎉');
});

const players = {}; // { idDelSocket: { name, score } }

io.on('connection', (socket) => {
    // el jugador manda su nombre al entrar
    socket.on('join', (name) => {
        const cleanName = String(name || '').trim().slice(0, 20) || 'Anónimo';
        players[socket.id] = { name: cleanName, score: 0 };
        io.emit('players', Object.values(players));
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('players', Object.values(players));
    });
});

// cada segundo: +1 punto a cada jugador conectado
setInterval(() => {
    for (const id in players) {
        players[id].score++;
    }
    io.emit('players', Object.values(players));
}, 1000);

server.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo');
});