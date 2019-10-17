import { RendererInterface } from "../Abstract/RendererInterface";
import TreeState from "./TreeState";
import { Point } from "../../CustomTypes/Point";
import Noise from "../Noise";
import Color from "../Color";

export default class TreeRenderer implements RendererInterface {

    simplex: any;
    timer: number;
    randomKeys: Array<any> = [0, [], []];
    state: TreeState;
    hsl: Array<number>;

    constructor() {
        this.simplex = Noise.get();
        this.timer = 0;
    }

    Render(treeState: TreeState, ctx: CanvasRenderingContext2D): void {
        const {size, position, angle, iterations, color} = treeState;
        this.state = treeState;
        // const rawHsl = treeState.color.getHsl();
        // this.hsl = [Math.floor(rawHsl[0] * 360), Math.floor(rawHsl[1] * 100), Math.floor(rawHsl[2] * 100)]
        const newPoint = this.DrawLine(size, position, 0, iterations, ctx);
        this.Iterate(size, newPoint, angle, iterations - 1, ctx, this.randomKeys);
        this.Iterate(size, newPoint, -angle, iterations - 1, ctx, this.randomKeys);
        this.timer++;
    }

    DrawLine(size: number, point: Point, angle: number, iteration: number, ctx: CanvasRenderingContext2D) {
        const newPoint = {
            x: point.x + Math.cos(- Math.PI / 2 + angle) * size,
            y: point.y + Math.sin(- Math.PI / 2 + angle) * size
        }
        const {r, g, b} = this.state.color;
        const progression = iteration / this.state.iterations;
        ctx.strokeStyle = `rgb(${r * progression}, ${g * progression}, ${b * progression})`;
        // ctx.strokeStyle = `hsl(${this.hsl[0]}, ${this.hsl[1]}%, ${Math.floor((iteration / this.state.iterations) * 100)}%)`;
        ctx.lineWidth = size / 8; 
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(newPoint.x, newPoint.y);
        ctx.stroke();

        return newPoint;
    }
    
    Iterate(
        size: number,
        point: Point,
        angle: number,
        iteration: number,
        ctx: CanvasRenderingContext2D,
        randomKeys: Array<any>
    ) {
        if (iteration <= 0) {
            return;
        }
        if (randomKeys.length == 0) {
            randomKeys.push((0.5 - Math.random()) / 5, [], []);
        }

        angle += (this.simplex.noise2D(this.state.position.x * randomKeys[0], this.timer * 0.001) / iteration) + randomKeys[0];

        const newPoint = this.DrawLine(size, point, angle, iteration, ctx);

        this.Iterate(size * 0.7, newPoint, angle - this.state.angle, iteration - 1, ctx, randomKeys[1]);
        this.Iterate(size * 0.7, newPoint, angle + this.state.angle, iteration - 1, ctx, randomKeys[2]);
    }
}