import { RendererInterface } from "../Abstract/RendererInterface";
import CircleState from "./CircleState";

export default class CircleStarRenderer implements RendererInterface {

    Render({color, position, size}: CircleState, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = color.toString();
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#ffffffff';
        ctx.beginPath();
        ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
    }

}
