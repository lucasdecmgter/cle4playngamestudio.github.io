export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){}

    preload(): void {
        this.load.image('sky', require('../assets/background.png'))
        this.load.image('night', require('../assets/night.png'))
        this.load.image('chip', require('../assets/chip.png'))
        this.load.image('enemy', require('../assets/enemy.png'))
        this.load.image('rob', require('../assets/robot.png'))
        this.load.image('platform', require('../assets/float.png'))
        this.load.image('movingplatform', require('../assets/float.png'))
        this.load.image('movingplatformvertical', require('../assets/float.png'))
        this.load.image('ground', require('../assets/platform_ground.png'))
        this.load.image('wall', require('../assets/wall.png'))
        this.load.image('mybutton1', require('../assets/startgame.png'))
        this.load.image('mybutton2', require('../assets/tryagain.png'))
        this.load.image('mybutton3', require('../assets/quitgame.png'))
        this.load.image('gameoverimage', require('../assets/gameoverimage.png'))
        this.load.image('youwonimage', require('../assets/victory.png'))
        this.load.image('cloud', require('../assets/cloud.png'))

        this.load.on('complete', () => {
            console.log("everything is loaded")
            
            // Start de startscene
            this.scene.start("StartScene")
        })
    }
}