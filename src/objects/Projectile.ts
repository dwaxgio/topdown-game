import Phaser from 'phaser';

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    velocityX: number,
    velocityY: number
  ) {
    super(scene, x, y, 'projectile');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.createGraphics();
    this.setVelocity(velocityX, velocityY);

    // Destroy after 10 seconds
    scene.time.delayedCall(10000, () => {
      this.destroy();
    });
  }

  private createGraphics(): void {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0xffff00, 1);
    graphics.fillCircle(5, 5, 4);
    graphics.generateTexture('projectile', 10, 10);
    graphics.destroy();
  }
}
