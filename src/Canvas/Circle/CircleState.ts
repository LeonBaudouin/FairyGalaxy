import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { OneDimensionSizeState, PositionState } from "../Abstract/BaseStates";
import { Point } from "../../CustomTypes/Point";
import Color from "../Color";

export default class CircleState implements StateObjectInterface, CircleStateParams {

    public color: Color;
    public size: number;
    public position: Point;

    constructor({color, size, position}: CircleStateParams) {
        this.color = color;
        this.size = size;
        this.position = {...position};
    }

    Clone(): CircleState {
        return new CircleState(this);
    }


}

export interface CircleStateParams extends OneDimensionSizeState, PositionState {
    color: Color
}
