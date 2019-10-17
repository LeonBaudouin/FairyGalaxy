import { ControllerInterface } from "../Abstract/ControllerInterface";
import { PhysicState } from "../Abstract/BaseStates";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";

type PhysicStateInterface = PhysicState & StateObjectInterface;

export default class PhysicUpdate implements ControllerInterface {

    private lastTime: number;
    private expectedFps: number = 1000 / 60;
    private inertia: number;

    constructor({inertia} : {inertia: number}) {
        this.inertia = inertia;
        this.lastTime = Date.now();
    }

    Update(
        currentState: PhysicStateInterface,
        defaultState: PhysicStateInterface
    ): PhysicStateInterface {
        const now = Date.now();
        const deltaTime = now - this.lastTime;
        this.lastTime = now;

        const newState = <PhysicStateInterface>currentState.Clone();
        newState.acceleration = {x: 0, y: 0};
        const newVelocity = {
            x: currentState.velocity.x + currentState.acceleration.x * (deltaTime / this.expectedFps) / (1 - this.inertia),
            y: currentState.velocity.y + currentState.acceleration.y * (deltaTime / this.expectedFps) / (1 - this.inertia)
        }
        newState.velocity.x = Math.abs(newVelocity.x) > 3 ? currentState.velocity.x : newVelocity.x;
        newState.velocity.y = Math.abs(newVelocity.y) > 3 ? currentState.velocity.y : newVelocity.y;
        newState.position.x += currentState.velocity.x * (deltaTime / this.expectedFps);
        newState.position.y += currentState.velocity.y * (deltaTime / this.expectedFps);
        return newState;
    }
    
}

