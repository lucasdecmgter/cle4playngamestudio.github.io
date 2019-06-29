export class WonScene extends Phaser.Scene {

    constructor() {
        super({key: "WonScene"})
    }

    init(): void {}
    preload(): void {}

    create(): void {
        // change this to a nice game over image
        this.add.image(0, 0, 'youwonimage').setOrigin(0, 0)

        // Knop aanmaken die je laat terugkeren naar het hoofdmenu
        let btn2 = this.add.image(400,520, 'mybutton3')
        btn2.setInteractive()
        btn2.on('pointerdown', (pointer) => {
            this.scene.start(`StartScene`)
        })
    }
}