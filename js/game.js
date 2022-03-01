class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.initBackground();
    this.player = new Player(this.canvas, this.ctx);
    this.obstacles = [];
    this.lives = 3;
    this.score = 0;
    this.frame = 0;
    this.animate();
  }

  initBackground = () => {
    this.background = new Image();
    this.background.src = "./images/pitch.jpeg";
  };

  animate = () => {
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.player.draw();

    let gameId = requestAnimationFrame(this.animate);

    this.obstacles.forEach((obstacle, idx) => {
      obstacle.draw();
      obstacle.moveDown();
      this.checkCollision(obstacle, idx, gameId);
      this.checkObstaclePassesPlayer(obstacle, idx);
    });

    this.frame++;

    if (this.frame % 70 === 0) {
      this.createObstacle();
    }

    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(
      0,
      this.canvas.height / 400,
      this.canvas.width,
      this.canvas.height / 25
    );
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Harry Potter, sans-serif";
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(
      "Lives: " + new String("🧹").repeat(Math.max(0, this.lives - 1)),
      this.canvas.width - 100,
      20
    );
  };

  createObstacle = () => {
    let obstacle = new Obstacle(this.canvas, this.ctx);
    this.obstacles.push(obstacle);
  };

  checkCollision = (obstacle, idx, gameId) => {
    const margin = 10;

    const player = {};
    player.left = this.player.x;
    player.right = player.left + this.player.width;
    player.top = this.player.y;
    player.bottom = player.top + this.player.height;

    obstacle.left = obstacle.x;
    obstacle.right = obstacle.left + obstacle.width;
    obstacle.top = obstacle.y;
    obstacle.bottom = obstacle.top + obstacle.height;

    if (
      player.right + margin > obstacle.left &&
      obstacle.right > player.left + margin &&
      player.bottom > obstacle.top &&
      obstacle.bottom > player.top + margin
    ) {
      this.lives--;
      this.obstacles = [];

      if (this.lives === 0) {
        this.endGame(gameId);
      }
    }
  };

  checkObstaclePassesPlayer = (obstacle, idx) => {
    if (Math.floor(obstacle.y) === this.canvas.height) {
      this.score += 100;
      this.obstacles.splice(idx, 1);
    }
  };

  endGame = (gameId) => {
    cancelAnimationFrame(gameId);
    const gameOverImg = new Image();
    gameOverImg.src = "./images/gameOver.jpeg";
    gameOverImg.addEventListener("load", () => {
      this.ctx.drawImage(
        gameOverImg,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.ctx.fillStyle = "#A80000";
      this.ctx.font = "50px Harry Potter, sans-serif";
      this.ctx.fillText(
        `Game Over`,
        this.canvas.width / 3.5,
        this.canvas.height / 7
      );
    });
  };
}
