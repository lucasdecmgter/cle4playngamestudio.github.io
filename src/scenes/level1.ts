// Importeer objecten en interface scene
import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { WalkingEnemy } from "../objects/walking-enemy"
import { JumpingEnemy } from "../objects/jumping-enemy"
import { HorizontalMoving } from "../objects/moving-platform-horizontal"
import { VerticalMoving } from "../objects/moving-platform-vertical"
import { UIScene } from "./ui-scene"

export class Level1 extends Phaser.Scene {

    // Properties aanmaken
    private player: Player
    private platforms: Phaser.GameObjects.Group
    private chip: Phaser.Physics.Arcade.Group
    private enemies: Phaser.GameObjects.Group

    // Eigenschappen overerven van parent
    constructor() {
        super({key: "Level1"})
    }

    // Algemene eigenschappen van het level
    init(): void {
        this.registry.set("score", 0)
        this.registry.set("life", 100)
        
        this.physics.world.bounds.width = 5693
        this.physics.world.bounds.height = 3185

        this.scene.add("UIScene", new UIScene("UIScene"), true)
    }

    // Het spawnen van objecten in het level
    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)      
    
        // 30 chips
        this.chip = this.physics.add.group({
            key: 'chip',
            repeat: 25,
            setXY: { x: 450, y: 2300, stepX: 220 },
        })

        // Het bestuurbare poppetje
        this.player = new Player(this)

        // Platformen maken
        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 2847, 3153, "ground"),
            new Platform(this, 400, 3025, "platform"),
            new Platform(this, 700, 3025, "platform"),
            new Platform(this, 1050, 2910, "platform"),
            new Platform(this, 2600, 3025, "platform"),
            new Platform(this, 2450, 2410, "platform"),
            new Platform(this, 2720, 2410, "platform"),
            new Platform(this, 3260, 2900, "platform"),
            new Platform(this, 3975, 2910, "platform"),
            new Platform(this, 4220, 2795, "platform"),
            new Platform(this, 3975, 2680, "platform"),
            new Platform(this, 4220, 2565, "platform"),
            new Platform(this, 3975, 2450, "platform"),
            new Platform(this, 2000, 2685, "wall"),
            new Platform(this, 2000, 2782, "wall"),
            new Platform(this, 2000, 2879, "wall"),
            new Platform(this, 2000, 2976, "wall"),
            new Platform(this, 2000, 3073, "wall"),
            new HorizontalMoving(this, 1370, 3020, "movinghorizontal"),
            new HorizontalMoving(this, 1823, 463, "movinghorizontal"),
            new HorizontalMoving(this, 2300, 2920, "movinghorizontal"),
            new HorizontalMoving(this, 3640, 3026, "movinghorizontal"),
            new HorizontalMoving(this, 4910, 2390, "movinghorizontal"),
            new HorizontalMoving(this, 4910, 2920, "movinghorizontal"),
            new VerticalMoving(this, 1800, 2850, "movingvertical"),
            new VerticalMoving(this, 3050, 2660, "movingvertical"),
            new VerticalMoving(this, 4640, 2660, "movingvertical"),
            new VerticalMoving(this, 5350, 2660, "movingvertical"),
            new VerticalMoving(this, 2130, 2660, "movingvertical")
        ], true)

        // Add enemies
        this.enemies = this.add.group()
        this.enemies.add(new JumpingEnemy(this, 4500, 2800), true)
        this.enemies.add(new WalkingEnemy(this, 850, 2650), true)

        // Botsingen definiëren tussen player, chips en vijanden met platformen
        this.physics.add.collider(this.chip, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemies, this.platforms)

        // Als de player overlapt met een chip of vijand
        this.physics.add.overlap(this.player, this.chip, this.collectChip, null, this)
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)
        
        // Cameragedrag
        this.cameras.main.setSize(800, 600)
        this.cameras.main.setBounds(0, 0, 5693, 3185)
        this.cameras.main.startFollow(this.player)
    }

    private hitEnemy() {
        this.registry.values.life = this.registry.values.life - 2

        if(this.registry.values.life <= 0) {
            this.scene.remove("UIScene")
            this.scene.start("EndScene")
            this.registry.values.score = 0
        }
    }

    // Als je een chip aanraakt
    private collectChip(player: Player, chip) : void {
        this.chip.remove(chip, true, true)
        this.registry.values.score++

        // Ga naar het volgende level bij genoeg chips
        if(this.registry.values.score == 20) {
            this.scene.start("Level2")
        }
    }

    // Update 60 keer per seconde
    update(){
        this.player.update()
    }
}