import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"

export class GameScene2 extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private score = 0

    constructor() {
        super({ key: "GameScene2" })
    }

    init(): void {

    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)      
    
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800, 574, "ground"),
            new Platform(this, 400, 400, "platform"),
            new MovingPlatform(this, 400, 250, "platform")
        ], true)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.score++
        console.log(this.score)

        // TO DO check if we have all the stars, then go to the end scene
        if(this.score == 12) {
            this.scene.start("GameScene3")
        }
    }

    update(){
        this.player.update()
    }

}