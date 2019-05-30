import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { StartScene } from "./scenes/start-scene"
import { GameScene } from "./scenes/game-scene"
import { GameScene2 } from "./scenes/game-scene2"
import { GameScene3 } from "./scenes/game-scene3"
import { EndScene } from "./scenes/end-scene"
import { UIScene } from "./scenes/ui-scene"

const config: GameConfig = {
    width: 800,
    height: 600,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [BootScene, StartScene, UIScene, GameScene, GameScene2, GameScene3, EndScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false, 
            gravity: { y: 400 }
        }
    },
    render: { pixelArt: true }
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config)
    }
}

window.addEventListener("load", () => new Game(config))