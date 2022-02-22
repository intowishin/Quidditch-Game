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
      this.width = this.image.width / 3;
      this.x = Math.floor(Math.random() * (this.canvas.width - this.width));
      this.height = this.image.height / 3;
      this.y = -this.height;
    });
  };

  draw = () => {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  moveDown = () => {
    this.y += 2;
  };
}
