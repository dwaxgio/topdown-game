# Vampire Survivor Game - Project Instructions

## Project Overview
This is a Vampire Survivors-like game built with Phaser 3 and TypeScript. The game features:
- Player character that can move around the arena
- Enemies spawning in waves that attack the player
- Automatic weapon system that fires at nearest enemy
- Experience and leveling system
- Wave-based progression
- Score tracking

## Installation & Setup
1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Build for production: `npm build`

## Project Structure
```
src/
  ├── index.ts            # Entry point
  ├── index.html          # HTML template
  ├── scenes/
  │   └── GameScene.ts    # Main game scene
  └── objects/
      ├── Player.ts       # Player character
      ├── Enemy.ts        # Enemy character
      ├── Weapon.ts       # Weapon system
      └── Projectile.ts   # Projectile class
```

## How to Play
- **Move**: Use Arrow Keys or WASD
- **Combat**: Automatic - your weapon fires at the nearest enemy
- **Objective**: Survive waves and defeat enemies to gain experience and level up
- **Progression**: Complete waves to advance to harder challenges

## Game Features
- ✓ Player movement and health system
- ✓ Enemy spawning with wave progression
- ✓ Automatic weapon firing
- ✓ Experience and leveling
- ✓ Score system
- ✓ UI with stats display
- ✓ Difficulty scaling

## Technologies Used
- **Phaser 3**: Game framework
- **TypeScript**: Programming language
- **Webpack**: Module bundler
- **Node.js**: Runtime environment
