export class EndScene extends Phaser.Scene {

    constructor() {
        super({key: "EndScene"})
    }

    init(): void {}
    preload(): void {}

    create(): void {
        // change this to a nice game over image
        this.add.image(0, 0, 'gameoverimage').setOrigin(0, 0)
        
        // Knop aanmaken die je opnieuw laat proberen
        let btn1 = this.add.image(400,500, 'mybutton2')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start(`GameScene`)
        })
    }
}