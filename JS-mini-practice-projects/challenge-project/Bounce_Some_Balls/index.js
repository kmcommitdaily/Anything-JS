// Setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Initialize ball count
let ballCount = 25; // Since you start with 25 balls

// Function to update the ball count display
function updateBallCount(change) {
  ballCount += change;
  document.getElementById(
    'ballCount'
  ).textContent = `Balls on screen: ${ballCount}`;
}

// Function to generate a random number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Shape class
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// EvilCircle class
class EvilCircle extends Shape {
  constructor(x, y, color = 'white', size = 10) {
    super(x, y, 20, 20);
    this.color = color;
    this.size = size;

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
          this.x -= this.velX;
          break;
        case 'd':
          this.x += this.velX;
          break;
        case 'w':
          this.y -= this.velY;
          break;
        case 's':
          this.y += this.velY;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= width) {
      this.x = width - this.size; // Update x to stay within bounds
    }
    if (this.x - this.size <= 0) {
      this.x = this.size; // Update x to stay within bounds
    }
    if (this.y + this.size >= height) {
      this.y = height - this.size; // Update y to stay within bounds
    }
    if (this.y - this.size <= 0) {
      this.y = this.size; // Update y to stay within bounds
    }
  }
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false; // Set the ball to not exist anymore
          updateBallCount(-1); // Decrement the count
        }
      }
    }
  }
}

// Ball class
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size, exists = true) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = exists;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

function addBall() {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
  updateBallCount(1); // Increment the count
}

// Create an array to store Ball instances
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}
updateBallCount(ballCount); // Display initial ball count

// Create an instance of EvilCircle with initial coordinates
const evilCircle = new EvilCircle(100, 100); // Example coordinates (100, 100)

// The loop function
function loop() {
  ctx.fillStyle = 'rgb(0 0 0 / 25%)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

// Start the loop
loop();
