import { ControllerInterface } from "../Abstract/ControllerInterface";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { PositionState } from "../Abstract/BaseStates";
import Noise from "../Noise";

type PositionStateInterface = StateObjectInterface & PositionState;

export default class NoisePosition implements ControllerInterface {

    private simplex: any;
    private time: number = 0;

    constructor() {
        this.simplex = Noise.get();
    }
    
    Update(currentState: PositionStateInterface, defaultState: PositionStateInterface): PositionStateInterface {
        const newState = <PositionStateInterface>currentState.Clone();
        newState.position.y = defaultState.position.y + this.simplex.noise2D(defaultState.position.x * 0.005, this.time * 0.005) * 30;
        this.time++;
        return newState;
    }
    
}
