import { constructor } from "q";

export class StartScene extends Phaser.Scene {

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {              
        // add another image here
        // this.add.image(0, 0, 'item').setOrigin(0, 0)
        this.add.image(300, 300, 'night')
        // add text here
        this.add.text(400, 300, 'Rob.AI', { fontFamily: 'Sheeping Cats Straight', fontSize: 70, color: '#000000' }).setOrigin(0.5).setStroke('#2ac9be', 16)

        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.image(400, 500, 'mybutton1')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('GameScene')
        })
    }
}