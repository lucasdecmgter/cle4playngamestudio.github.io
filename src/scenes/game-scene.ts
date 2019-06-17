import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Bomb } from "../objects/bomb"
import { UIScene } from "../scenes/ui-scene"

export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private bombs: Phaser.GameObjects.Group
    private score = 0

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        this.registry.set("score", 0)
        this.registry.set("life", 200)
        
        this.physics.world.bounds.width = 5693
        this.physics.world.bounds.height = 3185

        this.scene.add("UIScene", new UIScene("UIScene"), true)
    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)      
    
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 12,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        // TODO add player
        this.player = new Player(this)

        // Add platforms
        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800, 574, "ground"),
            new Platform(this, 200, 400, "platform"),
            new Platform(this, 600, 400, "platform")
        ], true)

        // Add enemies
        this.bombs = this.add.group()
        this.bombs.add(new Bomb(this, 250, 45), true)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)

        this.cameras.main.setSize(800, 600)
        this.cameras.main.setBounds(0, 0, 5693, 600)
        this.cameras.main.startFollow(this.player)
    }

    private hitBomb(player:Player, bomb) {
        this.scene.remove("UIScene")
        this.scene.start("EndScene")
    }

    private collectStar(player:Player , star) : void {
        this.stars.remove(star, true, true)
        this.score++
        console.log(this.score)

        // TO DO check if we have all the stars, then go to the end scene
        if(this.score == 12) {
            this.scene.start("GameScene2")
        }
    }

    update(){
        this.player.update()
    }
}