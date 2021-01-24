var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const vel = 2;
var dx = 0;
var dy = 0;

var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 2
}

var obstacles = [];

function draw_ball() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath()
}
function draw_obstacles() {
    obstacles.forEach(function (obs, i) {
        ctx.beginPath();
        ctx.rect(obs.x, obs.y, obs.width, obs.height);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    })
}

function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    draw_ball();
    draw_obstacles();
    if (border_collision()) {
        dx *= -1;
        dy *= -1;
    }
    ball.x += (dx * vel);
    ball.y += (dy * vel);
}

function border_collision() {
    if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
        return true;
    }
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
        return true;
    }
    return false;
}

function generateObstacle() {
    obs = {
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        width: Math.floor(Math.random() * 10) + ball.radius,
        height: Math.floor(Math.random() * 10) + ball.radius
    }
    obstacles.push(obs);
}

window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":
            dx = 0;
            dy = -1;
            break;
        case "ArrowDown":
            dx = 0;
            dy = 1;
            break;
        case "ArrowLeft":
            dx = -1;
            dy = 0;
            break;
        case "ArrowRight":
            dx = 1;
            dy = 0;
            break;
    }
})


setInterval(draw, 50);
setInterval(generateObstacle, 1000);

