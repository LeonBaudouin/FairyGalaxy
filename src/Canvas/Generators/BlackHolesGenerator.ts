import { GeneratorInterface } from "../Abstract/GeneratorInterface";
import { DrawableInterface } from "../Abstract/DrawableInterface";
import { Point, getDistance } from "../../CustomTypes/Point";
import { BaseDrawable } from "../Abstract/BaseDrawable";
import CircleState from "../Circle/CircleState";
import Color from "../Color";
import SizeOverTime from "../Controllers/SizeOverTime";
import Attractor from "../Controllers/Attractor";
import BlackHoleRenderer from "../Circle/BlackHoleRenderer";

export default class BlackHolesGenerator implements GeneratorInterface {
    FirstGeneration(): DrawableInterface[] {
        return (new Array(3)).fill(0).map((e, i, a) => this.generateInCircle(i / a.length)).concat([this.generateBlackHole(window.innerWidth/2, window.innerHeight/2)]);
    }

    private pointClicked: Point = null;

    constructor() {
        document.addEventListener('click', (e) => {
            this.pointClicked = {x: e.x, y: e.y};
        });
    }

    Generate(): DrawableInterface[] {
        const drawables = [];
        if (this.pointClicked != null) {
            drawables.push(this.generateBlackHole(this.pointClicked.x, this.pointClicked.y));
            this.pointClicked = null;
        }
        return drawables;
    }
    
    Remove(drawables: DrawableInterface[]): DrawableInterface[] {
        if (this.pointClicked != null) {
            const newDrawables = drawables.filter(drawable => {
                const circleState = <CircleState>(<BaseDrawable>drawable).getState();
                const clicked = getDistance(this.pointClicked, circleState.position) < circleState.size;
                if (clicked) {
                    const attractor = <Attractor>(<BaseDrawable>drawable).getControllers().filter(c => c instanceof Attractor)[0];
                    attractor.Remove();
                }
                return !clicked;
            });
            if (newDrawables.length < drawables.length) {
                this.pointClicked = null;
            }
            return newDrawables;
        }
        return drawables;
    }

    private generateBlackHole(x: number, y: number, offset: number = 0): BaseDrawable {
        return new BaseDrawable(
            new CircleState({
                color: new Color(17, 104, 162),
                size: 15,
                position: {x, y}
            }),
            new BlackHoleRenderer(),
            [],
            [
                new SizeOverTime({
                    offset,
                    amount: 2,
                    func: (time: number, amount: number, offset: number) => Math.sin(time * 0.05 + offset * Math.PI * 2) * amount
                }),
                new Attractor({
                    mass: 200
                })
            ]
        )
    }

    
    private generateInCircle(progression: number) {
        const radius = window.innerHeight / 2 - 100;
        const center = {x: window.innerWidth / 2, y: window.innerHeight / 2};
        return this.generateBlackHole(center.x + Math.cos(progression * Math.PI * 2) * radius, center.y + Math.sin(progression * Math.PI * 2) * radius, progression)   
    }

}
