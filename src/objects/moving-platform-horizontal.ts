export class HorizontalMoving extends Phaser.Physics.Arcade.Sprite {

    private startPosition:number

    constructor(scene, x: number, y: number, texture:string, friction:number = 1) {
        super(scene, x, y, texture)

        this.scene.physics.add.existing(this)
        
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0) 
        this.setImmovable(true)

        this.setVelocityX(60)
        this.startPosition = x
    }

    public update(): void {
        if (this.x >= this.startPosition + 180) {
            this.setVelocityX(-60)
        }  else if (this.x <= this.startPosition - 180) {
            this.setVelocityX(60)
        }
    }
}