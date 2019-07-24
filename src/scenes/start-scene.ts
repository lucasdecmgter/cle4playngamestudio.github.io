import { Arcade } from "../arcade/arcade"
import { Game } from "../app"

export class StartScene extends Phaser.Scene {

    private arcade : Arcade
    private nextGameListener : EventListener

    // Eigenschappen overerven van parent
    constructor() {
        super({key: "StartScene"})
    }

    // Algemene eigenschappen in scene zetten
    create(): void {
        let g = this.game as Game
        this.arcade = g.arcade

        this.nextGameListener = () => this.nextGame()
        document.addEventListener("joystick0button0", this.nextGameListener)
    }

    private nextGame() {
        document.removeEventListener("joystick0button0", this.nextGameListener)
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

    public update(){
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
    }
}