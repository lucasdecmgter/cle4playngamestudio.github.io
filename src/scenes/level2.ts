import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { WalkingEnemy } from "../objects/walking-enemy"
import { JumpingEnemy } from "../objects/jumping-enemy"
import { HorizontalMoving } from "../objects/moving-platform-horizontal"
import { VerticalMoving } from "../objects/moving-platform-vertical"

export class Level2 extends Phaser.Scene {
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private chip: Phaser.Physics.Arcade.Group
    private enemies: Phaser.GameObjects.Group

    constructor() {
        super({ key: "Level2" })
    }

    init(): void {
        this.registry.set("score", 0)
        this.registry.set("life", 100)
        
        this.physics.world.bounds.width = 5693
        this.physics.world.bounds.height = 3185
    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)      

        this.chip = this.physics.add.group({
            key: 'chip',
            repeat: 70,
            setXY: { x: 12, y: 2700, stepX: 70 },
        })

        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 2847, 3153, "ground"),
            new Platform(this, 150, 1886, "platform"),
            new Platform(this, 70, 2714, "platform"),
            new Platform(this, 510, 2449, "platform"),
            new Platform(this, 975, 3030, "platform"),
            new Platform(this, 750, 2560, "platform"),
            new Platform(this, 840, 2910, "platform"),
            new Platform(this, 1030, 2790, "platform"),
            new Platform(this, 2600, 2540, "platform"),
            new Platform(this, 1750, 2660, "platform"),
            new Platform(this, 500, 2000, "platform"),

            new Platform(this, 2847, 3153, "ground"),
            new Platform(this, 150, 1886, "platform"),
            new Platform(this, 70, 2714, "platform"),
            new Platform(this, 510, 2449, "platform"),
            new Platform(this, 975, 3030, "platform"),
            new Platform(this, 750, 2560, "platform"),
            new Platform(this, 840, 2910, "platform"),
            new Platform(this, 1030, 2790, "platform"),
            new Platform(this, 2600, 2540, "platform"),
            new Platform(this, 1750, 2660, "platform"),
            new Platform(this, 500, 2000, "platform"),
            new Platform(this, 1200, 2782, "wall"),
            new Platform(this, 1200, 2879, "wall"),
            new Platform(this, 1200, 2976, "wall"),
            new Platform(this, 1200, 3073, "wall"),

            new Platform(this, 1200, 2782, "wall"),
            new Platform(this, 1200, 2879, "wall"),
            new Platform(this, 1200, 2976, "wall"),
            new Platform(this, 1200, 3073, "wall"),
            new Platform(this, 1200, 2782, "wall"),
            new Platform(this, 1200, 2879, "wall"),
            new Platform(this, 1200, 2976, "wall"),
            new Platform(this, 1200, 3073, "wall"),
            new HorizontalMoving(this, 1823, 463, "movinghorizontal"),
            new HorizontalMoving(this, 1072, 2404, "movinghorizontal"),
            new HorizontalMoving(this, 3304, 2960, "movinghorizontal"),

            new HorizontalMoving(this, 1823, 463, "movinghorizontal"),
            new HorizontalMoving(this, 1072, 2404, "movinghorizontal"),
            new HorizontalMoving(this, 3304, 2960, "movinghorizontal"),
            new HorizontalMoving(this, 1823, 463, "movinghorizontal"),
            new HorizontalMoving(this, 1072, 2404, "movinghorizontal"),
            new HorizontalMoving(this, 3304, 2960, "movinghorizontal"),
            new HorizontalMoving(this, 1823, 463, "movinghorizontal"),
            new HorizontalMoving(this, 1072, 2404, "movinghorizontal"),
            new HorizontalMoving(this, 3304, 2960, "movinghorizontal"),
            new VerticalMoving(this, 1374, 2870, "movingvertical"),
            new VerticalMoving(this, 450, 2800, "movingvertical"),
            new VerticalMoving(this, 3304, 2760, "movingvertical"),
            new VerticalMoving(this, 350, 2165, "movingvertical"),

            new VerticalMoving(this, 450, 2800, "movingvertical"),
            new VerticalMoving(this, 3304, 2760, "movingvertical"),
            new VerticalMoving(this, 350, 2165, "movingvertical"),
            new VerticalMoving(this, 450, 2800, "movingvertical"),
            new VerticalMoving(this, 3304, 2760, "movingvertical"),
            new VerticalMoving(this, 350, 2165, "movingvertical")
        ], true)

        this.enemies = this.add.group()
        this.enemies.add(new JumpingEnemy(this, 600, 3035), true)
        this.enemies.add(new WalkingEnemy(this, 500, 3030), true)

        this.physics.add.collider(this.chip, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemies, this.platforms)
        
        this.physics.add.overlap(this.player, this.chip, this.collectchip, null, this)
        this.physics.add.overlap(this.player, this.enemies, this.hitenemy, null, this)

        this.cameras.main.setSize(1440, 900)
        this.cameras.main.setBounds(0, 0, 5693, 3185)
        this.cameras.main.startFollow(this.player)
    }

    private hitenemy(player:Player, enemy) {
        this.registry.values.life--

        if(this.registry.values.life == 0) {
            this.scene.remove("UIScene")
            this.scene.start("EndScene")
            this.registry.values.score = 0
        }
    }

    private collectchip(player : Player , chip) : void {
        this.chip.remove(chip, true, true)
        this.registry.values.score++

        if(this.registry.values.score == 12) {
            this.scene.start("Level3")
        }
    }

    update(){
        this.player.update()
    }
}