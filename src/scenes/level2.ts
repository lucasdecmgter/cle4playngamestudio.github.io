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
            repeat: 50,
            setXY: { x: 12, y: 50, stepX: 110 },
        })

        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 2845, 3153, "ground"),
            new Platform(this, 50, 3025, "platform"),
            new Platform(this, 800, 3020, "platform"),
            new Platform(this, 1050, 2895, "platform"),
            new Platform(this, 800, 2770, "platform"),
            new Platform(this, 1050, 2655, "platform"),
            new Platform(this, 1300, 2540, "platform"),
            new Platform(this, 2210, 2470, "platform"),
            new Platform(this, 2540, 2410, "platform"),
            new Platform(this, 2680, 3015, "platform"),
            new Platform(this, 2350, 2885, "platform"),
            new Platform(this, 3595, 2560, "platform"),
            new Platform(this, 3910, 2640, "platform"),
            new Platform(this, 4160, 2760, "platform"),
            new Platform(this, 4400, 2660, "platform"),
            new Platform(this, 4640, 2830, "platform"),
            new Platform(this, 4909, 3025, "platform"),
            new Platform(this, 4331, 2886, "platform"),
            new Platform(this, 4731, 2446, "platform"),
            new Platform(this, 2868, 2491, "wall"),
            new Platform(this, 2868, 2588, "wall"),
            new Platform(this, 2868, 2685, "wall"),
            new Platform(this, 2868, 2782, "wall"),
            new Platform(this, 2868, 2879, "wall"),
            new Platform(this, 2868, 2976, "wall"),
            new Platform(this, 2868, 3073, "wall"),
            new HorizontalMoving(this, 3235, 2470, "movinghorizontal"),
            new HorizontalMoving(this, 5380, 2910, "movinghorizontal"),
            new HorizontalMoving(this, 4863, 2560, "movinghorizontal"),
            new HorizontalMoving(this, 750, 2500, "movinghorizontal"),
            new VerticalMoving(this, 1680, 2850, "movingvertical"),
            new VerticalMoving(this, 1920, 2763, "movingvertical"),
            new VerticalMoving(this, 3271, 2840, "movingvertical"),
            new VerticalMoving(this, 4464, 2165, "movingvertical"),
            new VerticalMoving(this, 300, 2780, "movingvertical")
        ], true)

        this.enemies = this.add.group()
        this.enemies.add(new JumpingEnemy(this, 600, 2835), true)
        this.enemies.add(new JumpingEnemy(this, 4500, 2635), true)
        this.enemies.add(new WalkingEnemy(this, 3000, 3030), true)

        this.physics.add.collider(this.chip, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemies, this.platforms)
        
        this.physics.add.overlap(this.player, this.chip, this.collectchip, null, this)
        this.physics.add.overlap(this.player, this.enemies, this.hitenemy, null, this)

        this.cameras.main.setSize(800, 600)
        this.cameras.main.setBounds(0, 0, 5693, 3185)
        this.cameras.main.startFollow(this.player)
    }

    private hitenemy(player:Player, enemy) {
        this.registry.values.life = this.registry.values.life - 2

        if(this.registry.values.life == 0) {
            this.scene.remove("UIScene")
            this.scene.start("EndScene")
            this.registry.values.score = 0
        }
    }

    private collectchip(player : Player , chip) : void {
        this.chip.remove(chip, true, true)
        this.registry.values.score++

        if(this.registry.values.score == 45) {
            this.scene.start("Level3")
        }
    }

    update(){
        this.player.update()
        console.log(this.player.x, this.player.y)
    }
}