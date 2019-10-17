import { ControllerInterface } from "../Abstract/ControllerInterface";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { OneDimensionSizeState } from "../Abstract/BaseStates";

type SizeState = StateObjectInterface & OneDimensionSizeState;
type SizeOverTimeFunc = (time: number, amount: number, offset: number) => number

export default class SizeOverTime implements ControllerInterface {
    
    private offset: number;
    private amount: number;
    private func: SizeOverTimeFunc;
    private time: number = 0;
    
    constructor({offset, amount, func}: {offset: number, amount: number, func: SizeOverTimeFunc}) {
        this.offset = offset;
        this.amount = amount;
        this.func = func;
    }
    
    Update(currentState: SizeState, defaultState: SizeState): SizeState {
        const newState = <SizeState>currentState.Clone();
        newState.size = defaultState.size + this.func(this.time, this.amount, this.offset);
        this.time++;
        return newState;
    }
    
}
