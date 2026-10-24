const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let score = 0;
let scoreText = document.getElementById('score');

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '32px Arial';
    ctx.fillText('Score: ' + score, 16, 16);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    score++;
}

setInterval(update, 1000);
