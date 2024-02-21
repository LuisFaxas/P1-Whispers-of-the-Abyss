// Main game file that initializes and starts the game
import { setupInputListeners, isKeyPressed } from "./modules/input.js";
import { Player } from "./modules/player.js";
import { Enemy } from "./modules/enemy.js";

function preloadImages(imagePaths) {
  let loadPromises = imagePaths.map((src) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  });
  return Promise.all(loadPromises);
}

window.onload = () => {
  setupInputListeners();

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const gameWidth = canvas.width;
  const gameHeight = canvas.height;

  const playerImagePath =
    "../../Resources/Sprites/Custom/IronKnight/ironKnight.png";
  const enemyImagePath = "../Resources/Sprites/Enemies/Skelleton.png";

  preloadImages([playerImagePath, enemyImagePath])
    .then(() => {

      const player = new Player(
        gameWidth / 2,
        gameHeight / 2,
        5,
        64,
        1000,
        50,
        100,
        playerImagePath
      );

      let enemies = [
        new Enemy(100, 100, 64, 64, 1, 64, 20, 100, enemyImagePath),
        new Enemy(200, 200, 64, 64, 1, 64, 20, 100, enemyImagePath),
        new Enemy(150, 150, 64, 64, 1, 64, 20, 100, enemyImagePath),
      ];

      function update() {
        player.update(enemies);
        player.move(isKeyPressed);
        player.preventOutOfBounds(gameWidth, gameHeight);

        enemies.forEach((enemy, index) => {
          if (!enemy.isDead) {
            const otherEnemies = enemies.filter(
              (_, otherIndex) => otherIndex !== index
            );
            enemy.update(player, otherEnemies, gameWidth, gameHeight);
          } else if (!enemy.deathAnimationFinished) {
            enemy.update(player, [], gameWidth, gameHeight);
          }
        });

        /*enemies = enemies.filter(
          (enemy) => !(enemy.isDead && enemy.deathAnimationFinished)
        );*/
      }

      function render() {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
        player.draw(ctx);
        enemies.forEach((enemy) => {
          enemy.draw(ctx);
        });
      }

      function gameLoop() {
        update();
        render();
        window.requestAnimationFrame(gameLoop);
      }

      gameLoop();
    })
    .catch((error) => {
      console.error("Error while preloading images:", error);
    });
};
