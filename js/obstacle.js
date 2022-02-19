class Obstacle {
  constructor(cvs, ctx) {
    this.canvas = cvs;
    this.ctx = ctx;
    this.x = this.y = this.width = this.height = 0;
    this.image = null;
    this.initImage();
  }

  initImage = () => {
    this.image = new Image();
    this.image.src = "./images/malfoy.png";

    this.image.addEventListener("load", () => {
      this.x = this.canvas.width / 2 - this.image.width / 4 / 2;
      this.y = this.canvas.height - 100;
      this.width = this.image.width / 4;
      this.height = this.image.height / 4;
    });
  };

  draw = () => {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  moveDown = () => {
    this.y += 10;
  };
}
