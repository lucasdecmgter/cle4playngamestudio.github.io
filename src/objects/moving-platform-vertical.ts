export class VerticalMoving extends Phaser.Physics.Arcade.Sprite {

    private startPosition:number

    constructor(scene, x: number, y: number, texture:string, friction:number = 1) {
        super(scene, x, y, texture)

        this.scene.physics.add.existing(this)
        
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0)
        this.setImmovable(true)

        // moving platform
        this.setVelocityY(60)
        this.startPosition = y
    }

    public update(): void {
        if (this.y >= this.startPosition + 180) {
            this.setVelocityY(-60)
        }  else if (this.y <= this.startPosition - 180) {
            this.setVelocityY(60)
        }
    }
}