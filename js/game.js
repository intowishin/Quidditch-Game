class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.initBackground();
    this.player = new Player(this.canvas, this.ctx);
    this.obstacles = [];
    this.score = 100;
    this.frame = 0;
    this.animate();
  }

  initBackground = () => {
    this.background = new Image();
    this.background.src = "./images/pitch1.jpeg";
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
      // this.updateScore(obstacle, idx);
    });

    this.frame++;

    if (this.frame % 70 === 0) {
      this.createObstacle();
    }
  };

  createObstacle = () => {
    let obstacle = new Obstacle(this.canvas, this.ctx);
    this.obstacles.push(obstacle);
  };

  checkCollision = (obstacle, idx, gameId) => {
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
      player.right > obstacle.left &&
      obstacle.right > player.left &&
      player.bottom > obstacle.top &&
      obstacle.bottom > player.top
    ) {
      this.score -= 10;
      this.obstacles.splice(idx, 1);

      if (this.score === 0) {
        this.endGame(gameId);
      }
    }
  };

  endGame = (gameId) => {
    cancelAnimationFrame(gameId);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(
      0,
      this.canvas.height / 4,
      this.canvas.width,
      this.canvas.height / 2
    );
    this.ctx.fillStyle = "red";
    this.ctx.fillText(`Game Over!!!`, 30, this.canvas.height / 2);
  };

  updateScore = (obstacle, idx) => {
    if (obstacle.y > canvas.height) {
      this.obstacles.splice(idx, 1);
      this.score++;
    }
  };

  drawEverything = () => {
    this.ctx.fillStyle = "red";
    this.ctx.font = "50px Verdana";
    this.ctx.fillText(`Score: ${this.score}`, 10, 50);
  };
}
