class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.initBackground();
    this.player = new Player(this.canvas, this.ctx);
    this.obstacles = [];
    this.score = 0;
    this.frame = 0;
    this.animate();
  }

  initBackground = () => {
    this.background = new Image();
    this.background.src = "./images/pitch1.jpeg";
  }

  animate = () => {
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
    this.player.draw();

    let gameId = requestAnimationFrame(this.animate);

    this.obstacles.forEach((obstacle, idx) => {
      obstacle.draw();
      obstacle.moveDown();
      // this.checkCollision(obstacle, idx, gameId);
      // this.updateScore(obstacle, idx);
    });

    this.frame++;

    if (this.frame % 50 === 0) {
      this.createObstacle();
    } 
  }


  createObstacle = () => {
    let obstacle = new Obstacle(this.canvas, this.ctx);
    this.obstacles.push(obstacle);
  };


  checkCollision = (obstacle, idx, gameId) => {
    if (
      this.player.x + this.player.width > obstacle.x &&
      obstacle.x + obstacle.width > this.player.x &&
      this.player.y + this.player.height > obstacle.y &&
      obstacle.y + obstacle.height > this.player.y
    ) {
      this.obstacles.splice(idx, 1);
      cancelAnimationFrame(gameId);
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, canvas.height / 4, canvas.width, canvas.height / 2);
      this.ctx.fillStyle = 'red';
      this.ctx.fillText(`Game Over!!!`, 30, canvas.height / 2);
    }
  };

  updateScore = (obstacle, idx) => {
    if (obstacle.y > canvas.height) {
      this.obstacles.splice(idx, 1);
      this.score++;
    }
  };

  drawEverything = () => {
    this.ctx.fillStyle = 'red';
    this.ctx.font = '50px Verdana';
    this.ctx.fillText(`Score: ${this.score}`, 10, 50);
  };
}

