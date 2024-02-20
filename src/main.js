// Main game file that initializes and starts the game
import { setupInputListeners, isKeyPressed } from './modules/input.js';
import { Player } from './modules/player.js'
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

  const player = new Player(gameWidth / 2, gameHeight / 2, 5, 64, 20, 100)
    

  //player.x = gameWidth / 2;
  //player.y = gameHeight / 2;

  let enemies = [
    new Enemy(100, 100, 50, 50, 100),
    new Enemy(200, 200, 50, 50, 100),
  ]


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
    
    player.draw(ctx)

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