import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { WalkingEnemy } from "../objects/walking-enemy"
import { JumpingEnemy } from "../objects/jumping-enemy"
import { HorizontalMoving } from "../objects/moving-platform-horizontal"
import { VerticalMoving } from "../objects/moving-platform-vertical"

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
            repeat: 80,
            setXY: { x: 12, y: 50, stepX: 70 }
        })

        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 2640, 3153, "ground"),
            new Platform(this, 150, 3036, "platform"),
            new Platform(this, 2847, 3153, "ground"),
            new Platform(this, 150, 1886, "platform"),
            new Platform(this, 70, 2714, "platform"),
            new Platform(this, 510, 2449, "platform"),
            new Platform(this, 975, 3030, "platform"),
            new Platform(this, 750, 2560, "platform"),
            new Platform(this, 840, 2910, "platform"),
            new Platform(this, 1030, 2790, "platform"),
            new Platform(this, 2590, 2540, "platform"),
            new Platform(this, 1750, 2660, "platform"),
            new Platform(this, 4900, 2500, "platform"),
            new Platform(this, 4650, 2610, "platform"),
            new Platform(this, 4900, 2720, "platform"),
            new Platform(this, 4700, 2830, "platform"),
            new Platform(this, 4430, 2940, "platform"),
            new Platform(this, 4680, 3030, "platform"),
            new Platform(this, 4310, 2410, "platform"),
            new Platform(this, 5260, 2000, "platform"),
            new Platform(this, 2931, 3020, "platform"),
            new Platform(this, 3050, 2490, "platform"),
            new Platform(this, 2120, 2555, "platform"),
            new Platform(this, 3405, 2360, "platform"),
            new Platform(this, 4290, 2170, "platform"),
            new Platform(this, 3892, 3020, "platform"),
            new Platform(this, 2355, 2895, "platform"),
            new Platform(this, 2140, 3015, "platform"),
            new Platform(this, 1200, 2782, "wall"),
            new Platform(this, 1200, 2879, "wall"),
            new Platform(this, 1200, 2976, "wall"),
            new Platform(this, 1200, 3073, "wall"),
            new Platform(this, 3690, 2394, "wall"),
            new Platform(this, 3690, 2491, "wall"),
            new Platform(this, 3690, 2588, "wall"),
            new Platform(this, 3690, 2685, "wall"),
            new Platform(this, 3690, 2782, "wall"),
            new Platform(this, 3690, 2879, "wall"),
            new Platform(this, 3690, 2976, "wall"),
            new Platform(this, 3690, 3073, "wall"),
            new HorizontalMoving(this, 1823, 463, "movinghorizontal"),
            new HorizontalMoving(this, 1072, 2404, "movinghorizontal"),
            new HorizontalMoving(this, 3304, 2960, "movinghorizontal"),
            new HorizontalMoving(this, 3960, 2300, "movinghorizontal"),
            new HorizontalMoving(this, 4750, 2100, "movinghorizontal"),
            new HorizontalMoving(this, 5300, 2880, "movinghorizontal"),
            new VerticalMoving(this, 1394, 2850, "movingvertical"),
            new VerticalMoving(this, 450, 2800, "movingvertical"),
            new VerticalMoving(this, 3304, 2760, "movingvertical"),
            new VerticalMoving(this, 350, 2165, "movingvertical"),
            new VerticalMoving(this, 5100, 2300, "movingvertical"),
            new VerticalMoving(this, 4100, 2700, "movingvertical"),
            new VerticalMoving(this, 5580, 1880, "movingvertical")
        ], true)

        this.enemies = this.add.group()
        this.enemies.add(new JumpingEnemy(this, 1400, 2800), true)
        this.enemies.add(new JumpingEnemy(this, 4500, 2500), true)
        this.enemies.add(new WalkingEnemy(this, 2200, 2800), true)
        this.enemies.add(new WalkingEnemy(this, 4000, 0), true)
        this.enemies.add(new WalkingEnemy(this, 5500, 0), true)
        this.enemies.add(new WalkingEnemy(this, 750, 2700), true)

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
        this.registry.values.life = this.registry.values.life - 2

        if(this.registry.values.life == 0) {
            this.scene.remove("UIScene")
            this.scene.start("EndScene")
            this.registry.values.score = 0
        }
    }

    private collectchip(player : Player , chip) : void {
        this.chips.remove(chip, true, true)
        this.registry.values.score++

        if(this.registry.values.score == 75) {
            this.scene.remove("UIScene")
            this.scene.start("WonScene")
        }
    }

    update(){
        this.player.update()
    }
}