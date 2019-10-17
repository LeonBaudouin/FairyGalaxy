import { ControllerInterface } from "../Abstract/ControllerInterface";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { PositionState, OneDimensionSizeState } from "../Abstract/BaseStates";
import Noise from "../Noise";

type SizeAndPositionState = StateObjectInterface & PositionState & OneDimensionSizeState;

export default class SizeFromPositionAndNoise implements ControllerInterface {

    private simplex: any;
    private time: number = 0;
    private amount: number;
    private offset: number;

    constructor({offset, amount}: {offset: number, amount: number}) {
        this.simplex = Noise.get();
        this.offset = offset;
        this.amount = amount;
    }

    Update(currentState: SizeAndPositionState, defaultState: SizeAndPositionState): SizeAndPositionState {
        const newState = <SizeAndPositionState>currentState.Clone();
        const pos = currentState.position;
        const noiseFactor = this.simplex.noise3D(pos.x * 0.01, pos.y * 0.01, (this.time + this.offset) * 0.01);
        newState.size = defaultState.size + (this.amount / 2 - noiseFactor * this.amount);
        this.time++;
        return newState;
    }

}
