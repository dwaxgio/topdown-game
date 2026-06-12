import Phaser from 'phaser';
import Player from '../objects/Player';
import Enemy from '../objects/Enemy';
import Weapon from '../objects/Weapon';
import Projectile from '../objects/Projectile';

export default class GameScene extends Phaser.Scene {
  private player!: Player;
  private enemies!: Phaser.Physics.Arcade.Group;
  private weapons!: Weapon[];
  private projectiles!: Phaser.Physics.Arcade.Group;
  private score: number = 0;
  private wave: number = 1;
  private enemySpawnTimer: number = 0;
  private waveTimer: number = 0;
  private waveEnemyCount: number = 5;
  private waveEnemySpawned: number = 0;
  private isGameOver: boolean = false;
  private experiencePickup!: Phaser.Physics.Arcade.Group;
  private experience: number = 0;
  private level: number = 1;
  private experienceForNextLevel: number = 100;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  
  // UI
  private scoreText!: Phaser.GameObjects.Text;
  private waveText!: Phaser.GameObjects.Text;
  private healthText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    this.player = new Player(this, 640, 360);
    this.enemies = this.physics.add.group();
    this.projectiles = this.physics.add.group();
    this.experiencePickup = this.physics.add.group();

    // Initialize keyboard
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Initialize weapons - faster fire rate
    this.weapons = [new Weapon(this, 'projectile', 300)];

    // Create UI
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, {
      fontSize: '24px',
      color: '#fff',
    });
    this.scoreText.setScrollFactor(0);

    this.waveText = this.add.text(16, 50, `Wave: ${this.wave}`, {
      fontSize: '24px',
      color: '#0f0',
    });
    this.waveText.setScrollFactor(0);

    this.healthText = this.add.text(16, 84, `Health: ${this.player.health}`, {
      fontSize: '24px',
      color: '#f00',
    });
    this.healthText.setScrollFactor(0);

    this.levelText = this.add.text(1280 - 200, 16, `Level: ${this.level}`, {
      fontSize: '24px',
      color: '#ff0',
    });
    this.levelText.setScrollFactor(0);

    // Camera follow player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, 1280, 720);

    // Collisions
    this.physics.add.overlap(this.projectiles, this.enemies, this.projectileHitEnemy, undefined, this);
    this.physics.add.overlap(this.player, this.enemies, this.playerHitEnemy, undefined, this);
    this.physics.add.overlap(this.player, this.experiencePickup, this.playerPickupExperience, undefined, this);
  }

  update(): void {
    if (this.isGameOver) return;

    // Update player
    this.player.update(null);

    // Update enemies
    this.enemies.children.entries.forEach((enemy: any) => {
      enemy.update(this.player);
    });

    // Spawn enemies
    this.enemySpawnTimer += 1000 / 60; // Delta time
    if (this.enemySpawnTimer > 1000) {
      if (this.waveEnemySpawned < this.waveEnemyCount) {
        this.spawnEnemy();
        this.waveEnemySpawned++;
        this.enemySpawnTimer = 0;
      }
    }

    // Wave timer - after all enemies spawned, count down to next wave
    if (this.waveEnemySpawned >= this.waveEnemyCount && this.enemies.getLength() === 0) {
      this.waveTimer += 1000 / 60;
      if (this.waveTimer > 3000) {
        this.nextWave();
      }
    }

    // Update weapons
    this.weapons.forEach((weapon) => {
      weapon.update(this.player.x, this.player.y, this.projectiles, this.enemies);
    });

    // Update UI
    this.scoreText.setText(`Score: ${this.score}`);
    this.waveText.setText(`Wave: ${this.wave}`);
    this.healthText.setText(`Health: ${this.player.health}`);
    this.levelText.setText(`Level: ${this.level} (${this.experience}/${this.experienceForNextLevel})`);

    // Check if player is dead
    if (this.player.health <= 0) {
      this.gameOver();
    }
  }

  private spawnEnemy(): void {
    const angle = Math.random() * Math.PI * 2;
    const distance = 400;
    const x = this.player.x + Math.cos(angle) * distance;
    const y = this.player.y + Math.sin(angle) * distance;

    const enemy = new Enemy(this, x, y, this.wave);
    this.enemies.add(enemy);
  }

  private projectileHitEnemy(projectile: any, enemy: any): void {
    projectile.destroy();
    
    const damage = 10 + this.level;
    enemy.takeDamage(damage);

    if (enemy.health <= 0) {
      this.score += 10 + this.level;
      
      // Drop experience
      const exp = this.add.sprite(enemy.x, enemy.y, 'experience');
      this.experiencePickup.add(exp);
      this.physics.add.existing(exp);
      (exp.body as Phaser.Physics.Arcade.Body).setVelocity(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
      
      enemy.destroy();
    }
  }

  private playerHitEnemy(player: any, enemy: any): void {
    if (enemy.canDamage()) {
      this.player.takeDamage(3);
    }
  }

  private playerPickupExperience(player: any, exp: any): void {
    this.experience += 10;
    exp.destroy();

    if (this.experience >= this.experienceForNextLevel) {
      this.levelUp();
    }
  }

  private levelUp(): void {
    this.level++;
    this.experience = 0;
    this.experienceForNextLevel = Math.floor(this.experienceForNextLevel * 1.2);
    this.player.heal(20);
  }

  private nextWave(): void {
    this.wave++;
    this.waveEnemyCount = 5 + this.wave * 2;
    this.waveEnemySpawned = 0;
    this.enemySpawnTimer = 0;
    this.waveTimer = 0;
  }

  private gameOver(): void {
    this.isGameOver = true;
    this.physics.pause();

    const gameOverText = this.add.text(
      640,
      360,
      `GAME OVER\nScore: ${this.score}\nWave: ${this.wave}`,
      {
        fontSize: '48px',
        color: '#f00',
        align: 'center',
      }
    );
    gameOverText.setOrigin(0.5);
    gameOverText.setScrollFactor(0);
  }
}
