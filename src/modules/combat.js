// Define a function for checking collision between two rectangles
function checkCollision(player, enemy) {
  return (
    player.x < enemy.x + enemy.width &&
    player.x + player.width > enemy.x &&
    player.y < enemy.y + enemy.height &&
    player.height + player.y > enemy.y
  );
}

// Define a function to handle damage to an enemy
function handleEnemyDamage(enemy, damage) {
  // For simplicity, let's just log damage and set an "isHit" flag
  enemy.health -= damage
  console.log('Enemy took ${damage} damage! Current health: ${enemy.health}')

  console.log('Enemy took damage!');
  enemy.isHit = true;

  if (enemy.health <= 0) {
    enemy.isDead = true
    console.log('Enemy Defeated')
  }
  // Here you could deduct health from the enemy, play a sound, etc.
}

export { checkCollision, handleEnemyDamage };