import { checkCollision, handleEnemyDamage } from "./combat.js";
import { isKeyPressed, isAttackKeyPressed } from "./input.js";

const player = {
  x: 0,
  y: 0,
  speed: 2,
  size: 100,

  attackRange: 100,
  isAttacking: false,
  attackDuration: 500,
  lastAttackTime: 0,

  imgSrc: '../../Resources/Images/Game/PlayerDamnedCrow.webp',

  attack(enemies) { 
    if(this.isAttacking) return
      
    this.isAttacking = true
    console.log('Player Attack!')

      enemies.forEach(enemy => {
        if(checkCollision(this, enemy)){
          handleEnemyDamage(enemy, 10) //assuming damage 10
        }
      })

      setTimeout(() => {
        this.isAttacking = false
        
      }, this.attackDuration)
    },

    update(enemies) {
      if(isAttackKeyPressed()) {
        this.attack(enemies)
      }
    },
 

  move() {
    console.log('move called')
    if (isKeyPressed('ArrowUp')) {
      this.y -= this.speed;
    }
    if (isKeyPressed('ArrowDown')) {
      this.y += this.speed;
    }
    if (isKeyPressed('ArrowLeft')){
      this.x -= this.speed;
    }
    if (isKeyPressed('ArrowRight')){
      this.x += this.speed;
    }
  },

  //preventing out of bounds D:
  preventOutOfBounds(gameWidth, gameHeight) {
  if(this.x < 0) {
    this.x = 0
  }
  else if (this.x + this.size > gameWidth) {
    this.x = gameWidth - this.size
  }
  if(this.y < 0) {
    this.y = 0
  }
  else if (this.y + this.size > gameHeight) {
    this.y = gameHeight - this.size
  }
  },

  setImage() {
    const img = new Image()
    img.src = this.imgSrc
    return img
  },

}
export {player}