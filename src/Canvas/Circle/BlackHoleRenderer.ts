import { RendererInterface } from "../Abstract/RendererInterface";
import CircleState from "./CircleState";

export default class BlackHoleRenderer implements RendererInterface {
    
    Render({color, position, size}: CircleState, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#99ccff88';
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
    }

}
