export class MovingPlatform extends Phaser.Physics.Arcade.Sprite {

    private startPosition:number

    constructor(scene, x: number, y: number, texture:string, friction:number = 1) {
        super(scene, x, y, texture)

        this.scene.physics.add.existing(this)
        
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0)
        this.setImmovable(true)

        // moving platform
        this.setVelocityY(50)
        this.startPosition = y
    }

    public update(): void {
        if (this.y >= this.startPosition + 150) {
            this.setVelocityY(-50)
        }  else if (this.y <= this.startPosition - 150) {
            this.setVelocityY(50)
        }
    }
}