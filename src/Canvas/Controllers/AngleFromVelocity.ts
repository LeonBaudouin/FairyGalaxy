import { ControllerInterface } from "../Abstract/ControllerInterface";
import { PhysicState, AngleState } from "../Abstract/BaseStates";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { getAngle } from "../../CustomTypes/Point";

type AngleAndPhysicState = StateObjectInterface & PhysicState & AngleState;

export default class AngleFromVelocity implements ControllerInterface {
    
    Update(currentState: AngleAndPhysicState, defaultState: AngleAndPhysicState): AngleAndPhysicState {
        const newState = <AngleAndPhysicState>currentState.Clone();
        newState.angle = getAngle({x: 0, y: 0}, currentState.velocity);
        return newState;
    }

}
