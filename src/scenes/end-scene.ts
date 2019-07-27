export class EndScene extends Phaser.Scene {

    constructor() {
        super({key: "EndScene"})
    }

    // Algemene eigenschappen komen in scene
    init(): void {}

    // Laad de afbeeldingen en objecten vooraf
    preload(): void {}

    // Objecten en afbeeldingen spawnen
    create(): void {

        // Achtergrondafbeelding
        this.add.image(0, 0, 'gameoverimage').setOrigin(0, 0)
        
        // Knop aanmaken die je opnieuw laat proberen
        let btn1 = this.add.image(400,420, 'mybutton2')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start(`Level1`)
        })

        // Knop aanmaken die je laat terugkeren naar het hoofdmenu
        let btn2 = this.add.image(400,520, 'mybutton3')
        btn2.setInteractive()
        btn2.on('pointerdown', (pointer) => {
            this.scene.start(`StartScene`)
        })
    }
}