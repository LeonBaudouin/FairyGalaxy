import { ControllerInterface } from "../Abstract/ControllerInterface";
import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { PositionState } from "../Abstract/BaseStates";
const dat = require('dat.gui');

type SizeState = StateObjectInterface & PositionState;
type PositionOverTimeFunc = (time: number, amount: number, offset: number) => number

export default class Rotate2D implements ControllerInterface {
    
    private offset: number;
    private amount: number;
    private dat: RotateDat;
    public rotateX: number = 0;
    public rotateY: number = 0;
    public rotateZ: number = 0;

    
    constructor({offset, amount}: {offset: number, amount: number}) {
        this.offset = offset;
        this.amount = amount;
        this.dat = RotateDat.getInstance();
    }
    
    Update(currentState: SizeState, defaultState: SizeState): SizeState {
        const newState = <SizeState>currentState.Clone();
        newState.position.x = defaultState.position.x + Math.cos((this.rotateZ + this.offset) * Math.PI * 2) * Math.cos(Math.PI * 2 * this.rotateY) * this.amount;
        newState.position.y = defaultState.position.y + Math.sin((this.rotateZ + this.offset) * Math.PI * 2) * Math.cos(Math.PI * 2 * this.rotateX) * this.amount;
        this.rotateZ += this.dat.rotateZ;
        this.rotateX += this.dat.rotateX;
        this.rotateY += this.dat.rotateY;
        return newState;
    }
    
}

class RotateDat {

    private static instance: RotateDat = null;
    private gui: any;
    public rotateX: number = 0;
    public rotateY: number = 0;
    public rotateZ: number = 0;

    constructor() {
        this.gui = new dat.GUI();
        this.gui.add(this, 'rotateX', 0, 0.01);
        this.gui.add(this, 'rotateY', 0, 0.01);
        this.gui.add(this, 'rotateZ', 0, 0.01);
    }

    public static getInstance(): RotateDat {
        if (RotateDat.instance == null) {
            RotateDat.instance = new RotateDat();
        }
        return RotateDat.instance;
    }
}
