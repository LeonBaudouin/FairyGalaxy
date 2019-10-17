import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { OneDimensionSizeState, PositionState, AngleState } from "../Abstract/BaseStates";
import Color from "../Color";
import { Point } from "../../CustomTypes/Point";

export default class TriangleState implements StateObjectInterface, TriangleStateParams {
    color: Color;
    size: number;
    position: Point;
    angle: number;

    constructor({color, size, position, angle}: TriangleStateParams) {
        this.color = color;
        this.size = size;
        this.position = {...position};
        this.angle = angle;
    }

    Clone(): TriangleState {
        return new TriangleState(this);
    }
}


export interface TriangleStateParams extends OneDimensionSizeState, PositionState, AngleState {
    color: Color
}
