export class Bomb extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "bomb")

        this.scene.physics.add.existing(this)

        this.setBounce(1)
        this.setCollideWorldBounds(true)

        this.setVelocityX(80)
    }
}