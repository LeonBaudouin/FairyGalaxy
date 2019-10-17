import { ControllerInterface } from "../Abstract/ControllerInterface";
import { PositionState } from "../Abstract/BaseStates";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { Point } from "../../CustomTypes/Point";

type PositionStateInterface = PositionState & StateObjectInterface;

export default class Attractor implements ControllerInterface {

    private static attractors = new Map<Attractor, Point>();
    public mass: number;

    constructor({mass}: {mass: number}) {
        this.mass = mass;
        Attractor.attractors.set(this, {x: 0, y: 0});
    }

    Update(currentState: PositionStateInterface, defaultState: PositionStateInterface): PositionStateInterface {
        Attractor.attractors.get(this).x = currentState.position.x;
        Attractor.attractors.get(this).y = currentState.position.y;
        return currentState;
    }

    public Remove() {
        Attractor.attractors.delete(this);
    }

    public static getAttractors(): Map<Attractor, Point> {
        return Attractor.attractors;
    }
    
}
