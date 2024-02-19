// Main game file that initializes and starts the game
import { setupInputListeners, isKeyPressed } from './modules/input.js';
import { player } from './modules/player.js'
import { isAttackKeyPressed } from './modules/input.js'
import { Enemy } from './modules/enemy.js'

// function preloadImages(images, callback) {
//   let loaded = 0
//   images.forEach((image) => {
//     image.onload = ( =>)
//   })
// }

window.onload = () => {
  setupInputListeners();

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const gameWidth = canvas.width;
  const gameHeight = canvas.height;

  player.x = gameWidth / 2;
  player.y = gameHeight / 2;

  let enemies = [
    new Enemy(100, 100, 50, 50),
    new Enemy(200, 200, 50, 50),
  ]

  const playerImg = player.setImage()

    playerImg.onload = () => {
      gameLoop()
    }

    // playerImg.src = player.imgSrc
    

  function update() {
    
    player.update(enemies);
    player.move(isKeyPressed);
    player.preventOutOfBounds(gameWidth, gameHeight);


    enemies = enemies.filter((enemy) => {
      enemy.update()
      return enemy.health > 0
    })
    
  }

  function render() {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    ctx.drawImage(playerImg, player.x, player.y, player.size, player.size);

    enemies.forEach(enemy => {
      enemy.draw(ctx)
    })
  }


  function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
  }

  

  gameLoop();
};