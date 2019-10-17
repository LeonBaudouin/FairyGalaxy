import { RendererInterface } from "../Abstract/RendererInterface";
import TriangleState from "./TriangleState";
import PhysicTriangleState from "./PhysicTriangleState";
import { getDistance } from "../../CustomTypes/Point";

export default class TriangleStrokeRenderer implements RendererInterface {
    Render({color, angle, position, size, velocity}: PhysicTriangleState, ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = color.toString();
        ctx.lineWidth = 2;
        ctx.shadowBlur = 3;
        ctx.shadowColor = color.toString();
        ctx.beginPath();
        ctx.moveTo(position.x + Math.cos(Math.PI / 3 * 2 * 0 + angle) * size * 2, position.y + Math.sin(Math.PI / 3 * 2 * 0 + angle) * size * 2);
        ctx.lineTo(position.x + Math.cos(Math.PI / 3 * 2 * 1 + angle) * size * 2, position.y + Math.sin(Math.PI / 3 * 2 * 1 + angle) * size * 2);
        ctx.lineTo(position.x + Math.cos(Math.PI / 3 * 2 * 2 + angle) * size * 2, position.y + Math.sin(Math.PI / 3 * 2 * 2 + angle) * size * 2);
        ctx.lineTo(position.x + Math.cos(Math.PI / 3 * 2 * 0 + angle) * size * 2, position.y + Math.sin(Math.PI / 3 * 2 * 0 + angle) * size * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
    }
    
}
