export class StartScene extends Phaser.Scene {

    // Eigenschappen overerven van parent
    constructor() {
        super({key: "StartScene"})
    }

    // Algemene eigenschappen in scene zetten
    init(): void {
    }

    preload(): void {
        // Achtergrondafbeelding
        this.add.image(300, 300, 'night')

        // Game titel
        this.add.text(400, 300, 'Rob.AI', { fontFamily: 'Sheeping Cats Straight', fontSize: 70, color: '#000000' }).setOrigin(0.5).setStroke('#2ac9be', 16)

        // Laat een knop interactief zijn
        let btn1 = this.add.image(400, 500, 'mybutton1')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('Level1')
        })
    }
}