import { PhysicState } from "../Abstract/BaseStates";
import { Point } from "../../CustomTypes/Point";
import TriangleState, { TriangleStateParams } from "./TriangleState";

export default class PhysicTriangleState extends TriangleState implements PhysicState {
    public velocity: Point;
    public acceleration: Point;

    constructor(params : PhysicState & TriangleStateParams) {
        super(params)
        this.velocity = {...params.velocity};
        this.acceleration = {...params.acceleration};
    }

    public Clone(): PhysicTriangleState {
        return new PhysicTriangleState(this);
    }
}
