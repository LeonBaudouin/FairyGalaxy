import { ControllerInterface } from "../Abstract/ControllerInterface";
import { PositionState } from "../Abstract/BaseStates";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { EasingFunction } from "../../CustomTypes/Easing";
import { Point } from "../../CustomTypes/Point";
import { ListenEvent } from "../Events/EventListeners/SimpleEventListener";
import { MouseClickListener } from "../Events/EventListeners/MouseClickListener";

type PositionStateInterface = StateObjectInterface & PositionState;

export default class MoveOnCLick implements ControllerInterface {

    private easingFunction: EasingFunction;
    private duration: number;
    private currentTime = 0;
    private follow: boolean = false;
    private target: Point = null;
    private lastPosition: Point;
    private clickListener: ListenEvent;

    constructor({easingFunction, duration}: MoveOnCLickParams) {
        this.clickListener = MouseClickListener.getInstance();
        this.easingFunction = easingFunction;
        this.duration = duration;
    }

    Update(currentState: PositionStateInterface, defaultState: PositionStateInterface): PositionStateInterface {
        const mouse = this.clickListener.getValue();
        
        if (mouse && mouse != this.target) {
            this.target = mouse;
            this.follow = true;
            this.currentTime = 0;
            this.lastPosition = {...currentState.position};
        }

        if (this.currentTime > this.duration) {
            this.follow = false;
            this.currentTime = 0;
        }

        if (this.follow) {
            const newState = <PositionStateInterface>currentState.Clone();
            newState.position.x = this.easingFunction(this.currentTime, this.lastPosition.x, this.target.x - this.lastPosition.x, this.duration);
            newState.position.y = this.easingFunction(this.currentTime, this.lastPosition.y, this.target.y - this.lastPosition.y, this.duration);
            this.currentTime++;
            return newState;
        }

        return currentState;
    }
    
}


interface MoveOnCLickParams {
    easingFunction: EasingFunction;
    duration: number;
}
