import { checkCollision, handleEnemyDamage } from "./combat.js";
import { isKeyPressed, isAttackKeyPressed } from "./input.js";

class Player {
  constructor(x, y, speed, size, damage, attackRange) {
    this.x = x
    this.y = y
    this.speed = speed
    this.size= size
    this.damage = damage
    this.attackRange = attackRange
    //this.imgSrc = imgSrc
    this.isAttacking = false
    this.attackDuration = 500
    this.lastAttackTime = Date.now()

    //animations 64by64px generated here: https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/#?body=Body_color_light&head=Human_male_light&ears=Big_ears_light&shoulders=Legion_steel&arms=Armour_steel&bauldron=none&bracers=Bracers_steel&gloves=Gloves_steel&chainmail=Chainmail_gray&armour=Plate_steel&cape=Solid_black&belt=Double_Belt_slate&legs=Armour_steel&shoes=Boots_charcoal&weapon=Longsword_longsword&bandana=Mail_steel&hat=Pigface_bascinet_steel
    
    
    this.spritesheet = new Image()
    let spriteSheetLoaded = false
    this.spritesheet.onload = () => {
      this.spriteSheetLoaded = true
    }
    this.spritesheet.src = '/P1-Whispers-of-the-Abyss/Resources/Sprites/Custom/IronKnight/ironKnight.png'

    this.spriteWidth = 64
    this.spriteHeight = 64

    this.numberOfFrames = 24

    this.animations = {
      idle: {row: 21 , frames: 1},
      walkUp: {row: 9, frames: 9},
      walkLeft: {row: 10, frames: 9},
      walkDown: {row: 11, frames: 9},
      walkRight: {row: 12, frames: 9},
    }

    this.currentAnimation = 'idle'
    this.frameIndex = 0
    this.tickCount = 0
    this.ticksPerFrame = 8

    /*this.img = new Image();
    this.img.src = imgSrc;
    this.img.onload = () => {
      this.imageLoaded = true
    }*/
  }


/*const player = {
  x: 0,
  y: 0,
  speed: 2,
  size: 100,

  attackRange: 100,
  isAttacking: false,
  attackDuration: 500,
  lastAttackTime: 0,

  imgSrc: '/P1-Whispers-of-the-Abyss/Resources/Images/Game/PlayerDamnedCrow.webp',*/

  draw(ctx) {
    if (!this.spritesheet.complete) {
      console.error('Sprite sheet has not loaded');
      return;
    }
    /*if (this.img.complete) {
      ctx.drawImage(this.img, this.x, this.y, this.size, this.size)
    } else {
      ctx.fillStyle = 'black'

      ctx.fillRect(this.x, this.y, this.width, this.height)
    }*/

    const animation = this.animations[this.currentAnimation]
    ctx.drawImage(
      this.spritesheet,
      this.frameIndex * this.spriteWidth,
      animation.row * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth,
      this.spriteHeight,
    )
  }

  //updating anim
  updateAnimation(){
    this.tickCount += 1
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0
      const animation = this.animations[this.currentAnimation]
      this.frameIndex = (this.frameIndex + 1) % animation.frames
    }
  }

  //current anim based on movement
  setCurrentAnimation(){
    const movingUp = isKeyPressed('ArrowUp');
    const movingDown = isKeyPressed('ArrowDown');
    const movingLeft = isKeyPressed('ArrowLeft');
    const movingRight = isKeyPressed('ArrowRight');

    if (movingUp){
      this.currentAnimation = 'walkUp'
    } else if (movingDown) {
      this.currentAnimation = 'walkDown'
    } else if (movingLeft) {
      this.currentAnimation = 'walkLeft'
    } else if (movingRight) {
      this.currentAnimation = 'walkRight'
    } else {
      this.currentAnimation ='idle'
    }
  }

  attack(enemies) { 
    if(this.isAttacking) return
      
    this.isAttacking = true
    console.log('Player Attack!')

      enemies.forEach(enemy => {
        if(checkCollision(this, enemy)){
          handleEnemyDamage(enemy, this.damage) //assuming damage 10
        }
      })

      setTimeout(() => {
        this.isAttacking = false
        
      }, this.attackDuration)
    }

    update(enemies) {
      if(isAttackKeyPressed()) {
        this.attack(enemies)
      }
      this.setCurrentAnimation()
      this.updateAnimation()
    }
 
    

  move() {
    //console.log('move called')
    /*if (isKeyPressed('ArrowUp')) {
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
    }*/
    const moveX =(isKeyPressed('ArrowLeft') ? -1 : 0) + (isKeyPressed('ArrowRight') ? 1 : 0)
    const moveY =(isKeyPressed('ArrowUp') ? -1 : 0) + (isKeyPressed('ArrowDown') ? 1 : 0)
    const diagonalFactor =(moveX !== 0 && moveY !== 0 ? Math.sqrt(2) : 1)

    this.x += moveX * (this.speed / diagonalFactor)
    this.y += moveY * (this.speed / diagonalFactor)
  }

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
  }

}
export {Player}