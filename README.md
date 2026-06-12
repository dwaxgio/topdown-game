# Vampire Survivor Game

A Vampire Survivors-like game built with Phaser 3 and TypeScript.

## Features

- **Player Character**: Blue circle that moves with WASD or Arrow keys
- **Enemies**: Red squares that spawn in waves and chase the player
- **Automatic Combat**: Yellow projectiles fire automatically at the nearest enemy
- **Experience System**: Defeat enemies to gain experience and level up
- **Wave Progression**: Each wave gets progressively harder with more enemies
- **Score Tracking**: Earn points by defeating enemies
- **Health System**: Manage your health as enemies deal damage

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone or download the project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot reload:
```bash
npm start
```

The game will open automatically at `http://localhost:8080`

### Production Build

Build for production:
```bash
npm build
```

The output will be in the `dist/` folder.

## Gameplay Guide

### Controls
- **Arrow Keys** or **WASD**: Move your character
- **Survive**: Avoid or defeat incoming enemies
- **Gain XP**: Defeat enemies to get experience orbs
- **Level Up**: Reach experience thresholds to level up and gain power

### Game Mechanics

1. **Waves**: The game progresses through waves, each with more enemies
2. **Automatic Firing**: Your weapon automatically targets and fires at the nearest enemy
3. **Experience Drops**: Defeated enemies drop experience orbs
4. **Leveling**: Collect experience to level up, increasing your damage and maximum health
5. **Difficulty Scaling**: Enemies get stronger as waves progress

### Tips
- Keep moving to avoid enemy clusters
- Defeat as many enemies as possible in each wave
- Level up to become stronger
- Try to reach the highest wave possible

## File Structure

```
.
├── src/
│   ├── index.ts              # Game entry point
│   ├── index.html            # HTML template
│   ├── scenes/
│   │   └── GameScene.ts      # Main game scene
│   └── objects/
│       ├── Player.ts         # Player class
│       ├── Enemy.ts          # Enemy class
│       ├── Weapon.ts         # Weapon system
│       └── Projectile.ts     # Projectile class
├── dist/                      # Compiled output
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── webpack.config.js         # Webpack config
└── README.md                 # This file
```

## Technologies

- **Phaser 3.55**: Game framework
- **TypeScript**: Type-safe JavaScript
- **Webpack 5**: Module bundler
- **Babel**: JavaScript transpiler (via ts-loader)

## Future Enhancements

Potential features to add:
- Multiple weapon types
- Power-ups and special items
- Boss encounters
- Different enemy types
- Sound effects and music
- Mobile touch controls
- Leaderboard system
- Skill tree / progression tree
- Visual effects (particles, animations)

## License

MIT

## Notes

This is a simplified Vampire Survivors-like game for learning and entertainment purposes.
