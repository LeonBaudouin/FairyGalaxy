import { ControllerInterface } from "../Abstract/ControllerInterface";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { PhysicState, OneDimensionSizeState } from "../Abstract/BaseStates";
import { getDistance } from "../../CustomTypes/Point";

type SizeAndPhysicState = StateObjectInterface & PhysicState & OneDimensionSizeState;

export default class ScaleOnVelocity implements ControllerInterface {

    private amount: number;
    private maxVelocity: number;

    constructor({maxVelocity, amount}: {maxVelocity: number, amount: number}) {
        this.maxVelocity = maxVelocity;
        this.amount = amount;
    }

    Update(currentState: SizeAndPhysicState, defaultState: SizeAndPhysicState): SizeAndPhysicState {
        const newState = <SizeAndPhysicState>currentState.Clone();
        const velocityAmount = getDistance({x: 0, y: 0}, currentState.velocity);
        const velocityFactor = velocityAmount > this.maxVelocity ? 0 : 1 - (velocityAmount / this.maxVelocity);
        newState.size = defaultState.size + (this.amount * velocityFactor) - this.amount / 2;
        return newState;
    }

    
}
