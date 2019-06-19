export class EndScene extends Phaser.Scene {

    constructor() {
        super({key: "EndScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        // change this to a nice game over image
        this.add.image(0, 0, 'sky').setOrigin(0, 0)

        // add text here
        this.add.text(400, 300, 'Haha, you died!😂', { fontFamily: 'Times New Roman', fontSize: 45, color: '#ff0000' }).setOrigin(0.5).setStroke('#00ff00', 16)

        // add code here to switch to the GameScene, after a mouse click


        let btn1 = this.add.image(100,500, 'mybutton2')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('GameScene')
        })
    }
}