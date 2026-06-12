import Phaser from 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  public health: number;
  private maxHealth: number;
  private speed: number;
  private target: Phaser.Physics.Arcade.Sprite | null = null;
  private lastDamageTime: number = 0;
  private damageCooldown: number = 1000; // milliseconds between damage

  constructor(scene: Phaser.Scene, x: number, y: number, wave: number = 1) {
    super(scene, x, y, 'enemy');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Difficulty scaling
    this.maxHealth = 20 + wave * 5;
    this.health = this.maxHealth;
    this.speed = 60 + wave * 10;

    this.createGraphics();
    this.setBounce(0.2);
  }

  private createGraphics(): void {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xff4444, 1);
    graphics.fillRect(0, 0, 20, 20);
    graphics.generateTexture('enemy', 20, 20);
    graphics.destroy();
  }

  update(target: Phaser.Physics.Arcade.Sprite): void {
    if (!target) return;

    // Calculate direction to target
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      const velocityX = (dx / distance) * this.speed;
      const velocityY = (dy / distance) * this.speed;
      this.setVelocity(velocityX, velocityY);
    }
  }

  canDamage(): boolean {
    const now = this.scene.time.now;
    if (now - this.lastDamageTime > this.damageCooldown) {
      this.lastDamageTime = now;
      return true;
    }
    return false;
  }

  takeDamage(amount: number): void {
    this.health -= amount;
  }
}
