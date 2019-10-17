import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { Point } from "../../CustomTypes/Point";
import { Size } from "../../CustomTypes/Size";
import { PositionState, TwoDimensionSizeState } from "../Abstract/BaseStates";
import Color from "../Color";

export default class RectangleState implements StateObjectInterface, RectangleStateParams {

    position: Point;
    size: Size;
    color: Color;

    constructor({position, size, color}: RectangleStateParams) {
        this.position = {...position};
        this.size = {...size};
        this.color = color;
    } 

    Clone(): RectangleState {
        return new RectangleState(this);
    }
    
}

interface RectangleStateParams extends PositionState, TwoDimensionSizeState {
    color: Color
}
