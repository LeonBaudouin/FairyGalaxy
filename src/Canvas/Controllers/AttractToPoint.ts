import { ControllerInterface } from "../Abstract/ControllerInterface";
import { PhysicState } from "../Abstract/BaseStates";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { getDistance, getAngle } from "../../CustomTypes/Point";
import Attractor from "./Attractor";

type PhysicStateInterface = PhysicState & StateObjectInterface;

// const G = 6.67408 * Math.pow(10, -11);
// const M_MOUSE = 5.972 * Math.pow(10, 24);
// const M_OBJ = 7.3477 * Math.pow(10, 22);

const G = 1 ;
const MAX_VELOCITY = 0.02;

export default class AttractToPoint implements ControllerInterface {

    private mass: number;

    constructor({mass}: {mass: number}) {
        this.mass = mass;
    }

    Update(
        currentState: PhysicStateInterface,
        defaultState: PhysicStateInterface
    ): PhysicStateInterface {
        const newState = <PhysicStateInterface>currentState.Clone();
        Attractor.getAttractors().forEach((point, attractor) => {
            const dist = getDistance(currentState.position, point);
            const angle = getAngle(currentState.position, point);
            let accelerationAmplitude = ((attractor.mass * this.mass) / (dist * dist)) * G;
            accelerationAmplitude = accelerationAmplitude > MAX_VELOCITY ? MAX_VELOCITY : accelerationAmplitude; 
            newState.acceleration.x += Math.cos(angle) * accelerationAmplitude;
            newState.acceleration.y += Math.sin(angle) * accelerationAmplitude;
        })
        return newState;
    }
    
}

