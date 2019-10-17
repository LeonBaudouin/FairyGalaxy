import { ControllerInterface } from "../Abstract/ControllerInterface";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { PhysicState } from "../Abstract/BaseStates";

type PhysicStateInterface = PhysicState & StateObjectInterface;

export default class RandomVelocity implements ControllerInterface {

    Update(currentState: PhysicStateInterface, defaultState: PhysicStateInterface): PhysicStateInterface {
        const newState = <PhysicStateInterface>currentState.Clone();
        newState.velocity.x += (0.5 - Math.random()) / 40;
        newState.velocity.y += (0.5 - Math.random()) / 80;
        return newState;
    }

}