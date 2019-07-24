import { Arcade } from "../arcade/arcade"
import { Game } from "../app"
import { Joystick } from "../arcade/input/joystick";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private arcade : Arcade
    private joystick : Joystick

    constructor(scene) {

        // Waar spawnt de player
        super(scene, 200, 3080, "rob")

        let g = this.scene.game as Game
        this.arcade = g.arcade

        document.addEventListener("joystick0button0", () => this.handleFireButton())

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.1)
        this.setDragX(600)
    }

    private handleFireButton() : void {
        console.log("Vuur!")
    }

    public update(): void {
        
        // Reageren op keyboard inputs en sprite omdraaien bij verandering van richting
        this.joystickInput()

        // Alleen kunnen springen als je 'gegrond' bent
        let grounded = this.body.touching.down 
        if (this.cursors.up.isDown && grounded) {
            this.setVelocityY(-340)
        }
        if (grounded == false) {
            this.setGravityY(40)
        }
    }

    private joystickInput() {
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
        if (this.arcade.Joysticks[0]) {
            this.setVelocityX(this.arcade.Joysticks[0].X * 200)
            this.setVelocityY(this.arcade.Joysticks[0].Y * 200)
        }
    }
}