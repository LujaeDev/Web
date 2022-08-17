const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Obstacle {
  constructor(x, y, velX, velY, size = 6, color = "red") {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.color = color;
  }

  draw() {
    this.update();

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  update() {
    this.x += this.velX;
    this.y += this.velY;

    if (
      this.x + this.size < 0 ||
      this.x > innerWidth + this.size ||
      this.y + this.size < 0 ||
      this.y > innerHeight + this.size
    ) {
      this.x = Math.random() > 0.5 ? 0 : innerWidth;
      this.y = Math.random() > 0.5 ? 0 : innerHeight;
      this.velX = (((player.x - this.x) * Math.random()) / 2) * 0.02;
      this.velY = (((player.y - this.y) * Math.random()) / 2) * 0.02;
    }
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.velX = 10;
    this.velY = 10;
    this.size = 5;
    this.speed = 2.5;
    this.color = "white";
  }
  update() {
    if (upPressed) this.y -= this.speed;
    if (downPressed) this.y += this.speed;
    if (rightPressed) this.x += this.speed;
    if (leftPressed) this.x -= this.speed;
  }

  draw() {
    this.update();

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}

const obstacles = [];
const player = new Player();

function makeObstacles() {
  while (obstacles.length < 100) {
    const size = 6;

    const obs = new Obstacle(
      Math.random() > 0.5 ? 0 : innerWidth,
      Math.random() > 0.5 ? 0 : innerHeight,
      0,
      0
    );

    obs.velX = (((player.x - obs.x) * Math.random()) / 2) * 0.02;
    obs.velY = (((player.y - obs.y) * Math.random()) / 2) * 0.02;
    obstacles.push(obs);
  }
}

function collisionDetect() {
  for (const obs of obstacles) {
    const dx = player.x - obs.x;
    const dy = player.y - obs.y;

    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    if (distance <= player.size + obs.size) return true;
  }

  return false;
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key === "ArrowDown") {
    downPressed = true;
  } else if (e.key === "ArrowLeft") {
    leftPressed = true;
  } else if (e.key === "ArrowRight") {
    rightPressed = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") {
    upPressed = false;
  } else if (e.key === "ArrowDown") {
    downPressed = false;
  } else if (e.key === "ArrowLeft") {
    leftPressed = false;
  } else if (e.key === "ArrowRight") {
    rightPressed = false;
  }
});

function gameEnd() {
  for (const obs of obstacles) {
    obs.velX = 0;
    obs.velY = 0;
    player.speed = 0;
  }
  window.alert("Game Over!!!!");
}

function loop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  player.draw();
  for (const obs of obstacles) {
    obs.draw();
  }

  if (collisionDetect()) {
    console.log("over");
    gameEnd();
  }

  requestAnimationFrame(loop);
}

makeObstacles();
loop();
