class Player {
  constructor(cvs, ctx) {
    document.addEventListener("keydown", this.move);
    this.x = this.y = this.width = this.height = 0;
    this.step = 15; // Distance in pixels to move the player each step.
    this.canvas = cvs;
    this.ctx = ctx;
    this.image = null;
    this.initImage();
  }

  /**
   * Initialize the image of the player.
   */
  initImage = () => {
    this.imageRight = new Image();
    this.imageRight.src = "./images/harryRight.png";
    this.imageLeft = new Image();
    this.imageLeft.src = "./images/harryLeft.png";

    this.image = this.imageRight;

    this.imageRight.addEventListener("load", () => {
      this.x = this.canvas.width / 2 - this.imageRight.width / 4 / 2;
      this.y = this.canvas.height - 100;
      this.width = this.imageRight.width / 5;
      this.height = this.imageRight.height / 4;
    });
  };

  draw = () => {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  move = (event) => {
    switch (event.code) {
      case "ArrowRight":
      case "KeyD":
        this.moveRight();
        break;
      case "ArrowLeft":
      case "KeyA":
        this.moveLeft();
        break;
    }
  };

  moveLeft = () => {
    this.image = this.imageLeft;

    // Ensure we don't move off the canvas.
    if (this.x - this.step < 0) {
      return;
    }

    this.x -= this.step;
  };

  moveRight = () => {
    this.image = this.imageRight;

    // Ensure we don't move off the canvas.
    if (this.x >= this.canvas.width - this.width) {
      return;
    }

    this.x += this.step;
  };
}
