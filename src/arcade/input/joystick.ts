import { DebugPanel } from "./support/debugpanel";

export class Joystick {
    private readonly BUT1 : number    = 8
    private readonly BUT2 : number    = 9
    private numberOfBUttons : number    = 0
    private buttonEvents : string[]  = []
    private axes : number[]  = []
    private gamepad : Gamepad
    private previousGamepad : Gamepad
    private DEBUG : boolean = true;
    private debugPanel : DebugPanel
    public get Y() : number  { return Math.round(this.axes[1]) }
    public get X() : number  { return Math.round(this.axes[0]) }

    private buttonPressed(b: any): any {
        if (typeof (b) == "object") {
            return b.pressed;
        }
        return b == 1.0;
    }

    private readGamepad(gamepad: Gamepad) : void {
        for (let index = 0; index < this.numberOfBUttons; index++) {
            if (this.buttonPressed(gamepad.buttons[index]) && !this.buttonPressed(this.previousGamepad.buttons[index])) {
                document.dispatchEvent(new Event(this.buttonEvents[index]))
            }
            if (this.buttonPressed(gamepad.buttons[this.BUT1]) && 
                this.buttonPressed(gamepad.buttons[this.BUT2]) &&
                (!this.buttonPressed(this.previousGamepad.buttons[this.BUT1]) ||  !this.buttonPressed(this.previousGamepad.buttons[this.BUT2]))) {
                    document.dispatchEvent(new Event('redirect'))
            }
        }

        // gamepad has 4 axes, first is x, second is y
        // an axe returns a float, only int is needed
        this.axes[0] = Math.round(gamepad.axes[0])
        this.axes[1] = Math.round(gamepad.axes[1])
        
        if (this.DEBUG) {
            // update the axes (x and y)
            this.debugPanel.Axes[0] = this.axes[0]
            this.debugPanel.Axes[1] = this.axes[1]

            this.debugPanel.update()
        }

        this.previousGamepad = gamepad
    }
    
    update() {
        let gamepad = navigator.getGamepads()[this.gamepad.index]
        if(gamepad) { this.readGamepad(gamepad)}
    }
}