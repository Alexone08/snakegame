const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna il cibo
    ctx.fillStyle = '#be5dff'; // Giallo brillante
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    // Disegna il serpente
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#d32f2f' : '#4a148c'; // Testa rossa, corpo viola
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    // Muovi il serpente
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Controlla cibo
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.innerText = score;
        food.x = Math.floor(Math.random() * canvas.width / 20);
        food.y = Math.floor(Math.random() * canvas.height / 20);
    } else {
        snake.pop();
    }

    // Controllo per collisioni
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(game);
        alert('Game Over! Punteggio: ' + score);
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
}

document.addEventListener('keydown', changeDirection);
const game = setInterval(draw, 200);
