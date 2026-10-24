const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const scoreText = document.getElementById('score');
const socket = io();

let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '32px Arial';
    ctx.fillText('Score: ' + score, 16, 48);
}

socket.on('scoreUpdate', (newScore) => {
    score = newScore;
    scoreText.textContent = score;
    draw();
});

draw();