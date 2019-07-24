import { Game } from "phaser";
import { Joystick } from "./input/joystick"

export class Arcade {
    private joysticks : Joystick[]
    private game : Game
    public get Joysticks() : Joystick[] { return this.joysticks}
}