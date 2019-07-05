import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Enemy } from "../objects/enemy"
import { HorizontalMoving } from "../objects/movingplatform"

export class Level3 extends Phaser.Scene {
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private chips: Phaser.Physics.Arcade.Group
    private Enemy: Phaser.GameObjects.Group

    constructor() {
        super({ key: "Level3" })
    }

    init(): void {
        this.registry.set("score", 0)
        this.registry.set("life", 100)
        
        this.physics.world.bounds.width = 5693
        this.physics.world.bounds.height = 3185
    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)      
    
        this.chips = this.physics.add.group({
            key: 'chip',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 2840, 3153, "ground"),
            new Platform(this, 600, 2960, "platform"),
            new Platform(this, 250, 3020, "platform"),
            new HorizontalMoving(this, 900, 2830, "platform")
        ], true)

        this.Enemy = this.add.group()
        this.Enemy.add(new Enemy(this, 250, 2900), true)

        this.physics.add.collider(this.chips, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.Enemy, this.platforms)
        
        this.physics.add.overlap(this.player, this.chips, this.collectchip, null, this)
        this.physics.add.overlap(this.player, this.Enemy, this.hitEnemy, null, this)

        this.cameras.main.setSize(800, 600)
        this.cameras.main.setBounds(0, 0, 5693, 3185)
        this.cameras.main.startFollow(this.player)
    }

    private hitEnemy(player:Player, enemy) {
        this.registry.values.life--

        if(this.registry.values.life == 0) {
            this.scene.remove("UIScene")
            this.scene.start("EndScene")
            this.registry.values.score = 0
        }
    }

    private collectchip(player : Player , chip) : void {
        this.chips.remove(chip, true, true)
        this.registry.values.score++

        if(this.registry.values.score == 12) {
            this.scene.remove("UIScene")
            this.scene.start("WonScene")
        }
    }

    update(){
        this.player.update()
    }
}