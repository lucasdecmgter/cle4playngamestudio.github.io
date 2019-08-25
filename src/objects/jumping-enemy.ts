export class JumpingEnemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, "jumpingenemy")
        this.scene.physics.add.existing(this)

        this.setBounceY(1)
        this.setBounceX(0.9)
        this.setCollideWorldBounds(true)

        this.setVelocityX(70)
    }
}