import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { WalkingEnemy } from "../objects/walking-enemy"
import { JumpingEnemy } from "../objects/jumping-enemy"
import { HorizontalMoving } from "../objects/moving-platform-horizontal"

export class Level3 extends Phaser.Scene {
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private chips: Phaser.Physics.Arcade.Group
    private enemies: Phaser.GameObjects.Group

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

        this.enemies = this.add.group()
        this.enemies.add(new JumpingEnemy(this, 250, 2900), true)
        this.enemies.add(new WalkingEnemy(this, 600, 2800), true)

        this.physics.add.collider(this.chips, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemies, this.platforms)
        
        this.physics.add.overlap(this.player, this.chips, this.collectchip, null, this)
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)

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