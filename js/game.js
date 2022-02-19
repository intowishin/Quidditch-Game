class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.initBackground();
    this.player = new Player(this.canvas, this.ctx);
    this.animate();
  }

  initBackground = () => {
    this.background = new Image();
    this.background.src = "./images/pitch1.jpeg";
  }

  animate = () => {
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
    this.player.draw();
    requestAnimationFrame(this.animate);
  }
}
