import { constructor } from "q";

export class StartScene extends Phaser.Scene {

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {              
        // add another image here
        this.add.image(0, 0, 'background')
        this.add.image(0, 0, 'item').setOrigin(0, 0)
        
        // add text here
        this.add.text(400, 300, 'Super Rob Bros.', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.image(100, 500, 'mybutton')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('GameScene')
        })
    }
}