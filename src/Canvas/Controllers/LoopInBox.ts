import { ControllerInterface } from "../Abstract/ControllerInterface";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { PositionState } from "../Abstract/BaseStates";
import { Interval } from "../../CustomTypes/Interval";

type PositionStateInterface = StateObjectInterface & PositionState;

export default class LoopInBox implements ControllerInterface {
    private horizontalInterval: Interval;
    private verticalInterval: Interval;
    constructor({horizontalInterval, verticalInterval}: {horizontalInterval: Interval, verticalInterval: Interval}) {
        this.horizontalInterval = horizontalInterval;
        this.verticalInterval = verticalInterval;
    }


    Update(currentState: PositionStateInterface, defaultState: PositionStateInterface): PositionStateInterface {
        const newState = <PositionStateInterface>currentState.Clone();

        if (currentState.position.x > this.horizontalInterval.max) {
            newState.position.x = this.horizontalInterval.min;
        }

        if (currentState.position.x < this.horizontalInterval.min) {
            newState.position.x = this.horizontalInterval.max;
        }
        
        if (currentState.position.y > this.verticalInterval.max) {
            newState.position.y = this.verticalInterval.min;
        }

        if (currentState.position.y < this.verticalInterval.min) {
            newState.position.y = this.verticalInterval.max;
        }

        return newState;
    }
    
}
