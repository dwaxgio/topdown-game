import Phaser from 'phaser';
import Projectile from './Projectile';

export default class Weapon {
  private scene: Phaser.Scene;
  private fireRate: number; // milliseconds between shots
  private lastFireTime: number = 0;
  private type: string;
  private range: number;

  constructor(scene: Phaser.Scene, type: string, fireRate: number) {
    this.scene = scene;
    this.type = type;
    this.fireRate = fireRate;
    this.range = 300;
  }

  update(
    playerX: number,
    playerY: number,
    projectiles: Phaser.Physics.Arcade.Group,
    enemies: Phaser.Physics.Arcade.Group
  ): void {
    const now = this.scene.time.now;

    // Find nearest enemy
    let nearestEnemy = null;
    let nearestDistance = this.range;

    enemies.children.entries.forEach((enemy: any) => {
      const dx = enemy.x - playerX;
      const dy = enemy.y - playerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestEnemy = enemy;
      }
    });

    // Fire if enemy in range and cooldown ready
    if (nearestEnemy && now - this.lastFireTime > this.fireRate) {
      this.fire(playerX, playerY, nearestEnemy, projectiles);
      this.lastFireTime = now;
    }
  }

  private fire(
    playerX: number,
    playerY: number,
    target: any,
    projectiles: Phaser.Physics.Arcade.Group
  ): void {
    const dx = target.x - playerX;
    const dy = target.y - playerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      const velocityX = (dx / distance) * 300;
      const velocityY = (dy / distance) * 300;

      const projectile = new Projectile(
        this.scene,
        playerX,
        playerY,
        velocityX,
        velocityY
      );
      projectiles.add(projectile);
    }
  }
}
