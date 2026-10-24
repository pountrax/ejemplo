const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const scoreText = document.getElementById('score');
const socket = io('https://mi-servidor.onrender.com'); // <-- tu URL

let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '32px Arial';
    ctx.fillText('Score: ' + score, 16, 40);
    scoreText.textContent = score;
}

// al hacer clic en el canvas, suma 1 y avisa a todos
canvas.addEventListener('click', () => {
    socket.emit('updateScore', score + 1);
});

socket.on('updateScore', (newScore) => {
    score = newScore;
    draw();
});

draw();