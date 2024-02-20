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
    this.moveX = 0
    this.moveY = -1

    //animations 64by64px generated here: https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/#?body=Body_color_light&head=Human_male_light&ears=Big_ears_light&shoulders=Legion_steel&arms=Armour_steel&bauldron=none&bracers=Bracers_steel&gloves=Gloves_steel&chainmail=Chainmail_gray&armour=Plate_steel&cape=Solid_black&belt=Double_Belt_slate&legs=Armour_steel&shoes=Boots_charcoal&weapon=Longsword_longsword&bandana=Mail_steel&hat=Pigface_bascinet_steel
    
    
    this.spritesheet = new Image()
    let spriteSheetLoaded = false
    this.spritesheet.onload = () => {
     this.spriteSheetLoaded = true
    }
    this.spritesheet.src = '../../Resources/Sprites/Custom/IronKnight/ironKnight.png'

    this.normalSpriteSize= 64
    this.attackSpriteSize = 192

    // this.spriteSize = this.isAttacking ? this.attackSpriteSize : this.normalSpriteSize
    
    //this.spriteWidth = 64
    //this.spriteHeight = 64

    this.numberOfFrames = 1
    
    this.animations = {
      idleUp: {row: 8 , frames: this.numberOfFrames},
      idleLeft: {row: 9 , frames: 1},
      idleDown: {row: 10 , frames: 1},
      idleRight: {row: 11 , frames: 1},

      walkUp: {row: 8, frames: 8},
      walkLeft: {row: 9, frames: 8},
      walkDown: {row: 10, frames: 8},
      walkRight: {row: 11, frames: 8},

      attackUp: {row: 7, frames: 6},
      attackLeft: {row: 8, frames: 6},
      attackDown: {row: 9, frames: 6},
      attackRight: {row: 10, frames: 6},
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
    //const spriteSize = this.isAttacking ? this.attackSpriteSize : this.normalSpriteSize
    
    //const drawX = this.x - spriteSize / 2;
    //const drawY = this.y - spriteSize / 2;
  const offsetX = this.isAttacking ? (this.attackSpriteSize - this.normalSpriteSize) / 1.3  : 0;
  const offsetY = this.isAttacking ? (this.attackSpriteSize - this.normalSpriteSize) / 1.3 : 0;
    /*if (this.img.complete) {
      ctx.drawImage(this.img, this.x, this.y, this.size, this.size)
    } else {
      ctx.fillStyle = 'black'

      ctx.fillRect(this.x, this.y, this.width, this.height)

       this.spriteSize = this.isAttacking ? this.attackSpriteSize : this.normalSpriteSize
    }*/

    this.spriteSize = this.isAttacking ? this.attackSpriteSize : this.normalSpriteSize

    const animation = this.animations[this.currentAnimation]
    ctx.drawImage(
      this.spritesheet,
      this.frameIndex * this.spriteSize,
      animation.row * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.x - offsetX ,
      this.y - offsetY ,
      this.spriteSize * 1.25,
      this.spriteSize * 1.5,
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

    const idlingUp = this.moveY + 1 === 0
    const idlingDown = this.moveY - 1 === 0
    const idlingLeft = this.moveX + 1 === 0
    const idlingRight = this.moveX - 1 === 0

    

    if (this.isAttacking) {
     if (movingUp) {
      this.currentAnimation = 'attackUp'
     }
     else if (movingLeft) {
      this.currentAnimation = 'attackLeft'
     }
     else if (movingDown) {
      this.currentAnimation = 'attackDown'
     }
     else if (movingRight) {
      this.currentAnimation = 'attackRight'
     } else {
      if (idlingLeft) {
        this.currentAnimation = 'attackLeft'
      } else if (idlingRight) {
        this.currentAnimation = 'attackRight'
      } else if (idlingUp) {
        this.currentAnimation = 'attackUp'
      } else if (idlingDown) {
        this.currentAnimation = 'attackDown'
      }
    }
    } else {
    if (movingDown) {
      this.currentAnimation = 'walkDown'
    } else if (movingLeft) {
      this.currentAnimation = 'walkLeft'
    } else if (movingRight) {
      this.currentAnimation = 'walkRight'
    } else if (movingUp) {
      this.currentAnimation = 'walkUp'
    } else {
      if (idlingLeft) {
        this.currentAnimation = 'idleLeft'
      } else if (idlingRight) {
        this.currentAnimation = 'idleRight'
      } else if (idlingUp) {
        this.currentAnimation = 'idleUp'
      } else if (idlingDown) {
        this.currentAnimation = 'idleDown'
      }
    }}
  }

  attack(enemies) { 
    if(this.isAttacking) return
      
    this.isAttacking = true
    console.log('Player Attack!')

    this.frameIndex = 0

      enemies.forEach(enemy => {
        if(checkCollision(this, enemy)){
          handleEnemyDamage(enemy, this.damage) //assuming damage 10
        }
      })

      setTimeout(() => {
        this.isAttacking = false

        this.setCurrentAnimation()
        
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
    this.moveX =(isKeyPressed('ArrowLeft') ? -1 : 0) + (isKeyPressed('ArrowRight') ? 1 : 0)
    this.moveY =(isKeyPressed('ArrowUp') ? -1 : 0) + (isKeyPressed('ArrowDown') ? 1 : 0)
    const diagonalFactor =(this.moveX !== 0 && this.moveY !== 0 ? Math.sqrt(2) : 1)

    this.x += this.moveX * (this.speed / diagonalFactor)
    this.y += this.moveY * (this.speed / diagonalFactor)
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