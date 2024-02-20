// enemy.js
export class Enemy {
  constructor(x, y, width, height, size) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = 100;
    this.isHit = false;
    this.isDead = false;
    this.size = size;

    this.imgSrc = '/P1-Whispers-of-the-Abyss/Resources/Images/Game/Enemy1.webp'
    this.img = new Image()
    this.img.src = this.imgSrc
    this.img.onload = () => {
      this.imageLoaded = true
    }
  }


  draw(ctx) {
    if (this.imageLoaded) {
      ctx.drawImage(this.img, this.x, this.y, this.size/1.8, this.size)
    } else {
      ctx.fillStyle = 'black'

      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }

  // Enemy methods such as update position, render, take damage, etc.
  update() {
    // Update position or other properties
  }

  // draw(context) {
  //   // Draw enemy on canvas
  //   context.fillRect(this.x, this.y, this.width, this.height);
  // }

  /*takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.isHit = true;
      // Handle enemy death
    }
  }*/
}