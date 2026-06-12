import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  public health: number = 150;
  private maxHealth: number = 150;
  private speed: number = 200;
  private keys: any = {};

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Create player graphics
    this.createGraphics();

    this.setCollideWorldBounds(true);
    this.setBounce(0.2);

    // Add keys to track
    this.keys = scene.input.keyboard?.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  private createGraphics(): void {
    const graphics = this.scene.make.graphics({ x: 0, y: 0 });
    graphics.fillStyle(0x4477ff, 1);
    graphics.fillCircle(20, 20, 15);
    graphics.generateTexture('player', 40, 40);
    graphics.destroy();
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys | any): void {
    let velocityX = 0;
    let velocityY = 0;

    // Arrow keys
    if (this.keys.left?.isDown) {
      velocityX = -this.speed;
    }
    if (this.keys.right?.isDown) {
      velocityX = this.speed;
    }
    if (this.keys.up?.isDown) {
      velocityY = -this.speed;
    }
    if (this.keys.down?.isDown) {
      velocityY = this.speed;
    }

    // WASD keys
    if (this.keys.A?.isDown) {
      velocityX = -this.speed;
    }
    if (this.keys.D?.isDown) {
      velocityX = this.speed;
    }
    if (this.keys.W?.isDown) {
      velocityY = -this.speed;
    }
    if (this.keys.S?.isDown) {
      velocityY = this.speed;
    }

    this.setVelocity(velocityX, velocityY);
  }

  takeDamage(amount: number): void {
    this.health -= amount;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  heal(amount: number): void {
    this.health += amount;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  }
}
