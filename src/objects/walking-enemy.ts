export class WalkingEnemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "walkingenemy")
        this.scene.physics.add.existing(this)

        this.setBounceX(1)
        this.setCollideWorldBounds(true)

        this.setVelocityX(80)
    }
}