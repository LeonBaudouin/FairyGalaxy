import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { PositionState, OneDimensionSizeState, AngleState } from "../Abstract/BaseStates";
import { Point } from "../../CustomTypes/Point";
import Color from "../Color";

export default class TreeState implements StateObjectInterface, TreeStateParams {

    public iterations: number;
    public position: Point;
    public size: number;
    public angle: number;
    public color: Color;

    constructor({iterations, position, size, angle, color}: TreeStateParams) {
        this.iterations = iterations;
        this.position = {...position};
        this.size = size;
        this.angle = angle;
        this.color = new Color(color.r, color.g, color.b);
    }

    Clone(): TreeState {
        return new TreeState(this);
    }

}

interface TreeStateParams extends PositionState, OneDimensionSizeState, AngleState {
    iterations: number;
    color: Color;
}