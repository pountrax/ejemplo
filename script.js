const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

const tbody = document.querySelector('#scoreboard tbody');
const socket = io('https://ejemplo-g0ye.onrender.com');

// pregunta el usuario al entrar
const username = (prompt('¿Cuál es tu usuario?') || '').trim() || 'Anónimo';

// al conectar (y si se reconecta) avisa quién sos
socket.on('connect', () => {
    socket.emit('join', username);
});

// el servidor manda la lista cada segundo
socket.on('players', (players) => {
    // ordena de mayor a menor puntaje
    players.sort((a, b) => b.score - a.score);

    // arma la tabla
    tbody.innerHTML = '';
    players.forEach((p, i) => {
        const tr = document.createElement('tr');
        [i + 1, p.name, p.score].forEach((value) => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        if (p.name === username) tr.classList.add('me');
        tbody.appendChild(tr);
    });

    // dibuja tu puntaje en el canvas
    const mine = players.find((p) => p.name === username);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '32px Arial';
    ctx.fillText('Tu puntaje: ' + (mine ? mine.score : 0), 16, 40);
});