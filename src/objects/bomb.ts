export class Bomb extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "bomb")

        this.scene.physics.add.existing(this)

        this.setBounce(0)
        this.setCollideWorldBounds(true)

        this.setAngularVelocity(30);
        this.setVelocityX(100)
    }
}