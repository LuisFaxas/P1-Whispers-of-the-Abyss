
function checkCollision(player, enemy) {
  return (
    player.x < enemy.x + enemy.size &&
    player.x + player.size > enemy.x &&
    player.y < enemy.y + enemy.size &&
    player.y + player.size > enemy.y
  );
}


function handleEnemyDamage(enemy, damage) {
  
  enemy.health -= damage
  console.log(`Enemy took ${damage} damage! Current health: ${enemy.health}`)

  enemy.isHit = true;

  if (enemy.health <= 0) {
    enemy.isDead = true
    console.log('Enemy Defeated')
  }
 
}

export { checkCollision, handleEnemyDamage };