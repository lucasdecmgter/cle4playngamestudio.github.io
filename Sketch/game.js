const gameState = {};

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('city', 'assets/Background.png');
    this.load.image('platform', 'assets/Float platform 3.png');
    this.load.spritesheet('CRISI', 'assets/123.png', { frameWidth: 72, frameHeight: 72 });
    this.load.spritesheet('piskel', 'assets/Enemy.png', { frameWidth: 85, frameHeight: 85 });
  }

  create() {
    gameState.active = true;

    this.add.image(0, 0, 'city').setOrigin(0, 0);

    const platforms = this.physics.add.staticGroup();
    const platPositions = [
      { x: 50, y: 575 }, { x: 250, y: 575 }, { x: 450, y: 575 }, { x: 400, y: 380 }, { x: 100, y: 200 },
    ];
    platPositions.forEach(plat => {
      platforms.create(plat.x, plat.y, 'platform')
    });

    gameState.player = this.physics.add.sprite(40, 380, 'CRISI').setScale(.8)

    this.physics.add.collider(gameState.player, platforms);
    gameState.player.setCollideWorldBounds(true);

    gameState.cursors = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('CRISI', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('CRISI', { start: 1, end: 1 }),
      frameRate: 5,
      repeat: -1
    });

    gameState.enemy = this.physics.add.sprite(480, 200, 'piskel');

    platforms
    this.physics.add.collider(gameState.enemy, platforms);
    
    this.anims.create({
      key: 'piskelAlert',
      frames: this.anims.generateFrameNumbers('piskel', { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1
    });
    
    gameState.enemy.anims.play('piskelAlert', true);

  
    this.physics.add.overlap(gameState.player, gameState.enemy, () => {
      this.add.text(150, 50, 'You Lose! Click to play again.', { fontFamily: 'Verdana', fontSize: 20, color: '#ffffff' });
      this.physics.pause();
      gameState.active = false;
      this.anims.pauseAll();
      gameState.enemy.move.stop();
      
      this.input.on('pointerup', () => {
        this.anims.resumeAll();
        this.scene.restart();
      })
    })
    
    gameState.enemy.move = this.tweens.add({
      targets: gameState.enemy,
      x: 320,
      ease: 'Linear',
      duration: 1800,
      repeat: -1,
      yoyo: true
    });
    
  }

  update() {
    if (gameState.active) {
      if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(350);
        gameState.player.anims.play('run', true);
        gameState.player.flipX = false;
      } else if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-350);
        gameState.player.anims.play('run', true);
        gameState.player.flipX = true;
      } else {
        gameState.player.setVelocityX(0);
        gameState.player.anims.play('idle', true);
      }
      if (gameState.cursors.up.isDown && gameState.player.body.touching.down) {
        gameState.player.anims.play('jump', true);
        gameState.player.setVelocityY(-800);
      }
    }
  }
}


const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1500 },
      enableBody: true,
    }
  },
  scene: [GameScene]
};

const game = new Phaser.Game(config);


