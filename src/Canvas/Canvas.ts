import { Size } from "../CustomTypes/Size";
import { DrawableInterface } from "./Abstract/DrawableInterface";
import { GlobalControlerInterface } from "./Abstract/GlobalControlerInterface";

export class Canvas {

    static instance : Canvas;
    drawnObjects : DrawableInterface[];
    globalController: GlobalControlerInterface[];
    htmlElement : HTMLCanvasElement;
    context : CanvasRenderingContext2D;

    constructor(
        drawnObjects : DrawableInterface[],
        htmlElement : HTMLCanvasElement,
        context : CanvasRenderingContext2D,
        globalController : GlobalControlerInterface[] = []
    ) {
        Canvas.instance = this; 
        this.drawnObjects = drawnObjects;
        this.globalController = globalController;
        this.htmlElement = htmlElement;
        this.context = context;
        this.Resize();
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.htmlElement.width, this.htmlElement.height);
    }

    private Resize(): void {
      this.htmlElement.width = window.innerWidth;
      this.htmlElement.height = window.innerHeight;
    }

    public Loop() : void {
        // this.context.clearRect(0, 0, this.htmlElement.width, this.htmlElement.height);
        
        this.globalController.forEach(controller => {
            controller.Update()
        })

        this.drawnObjects.forEach(element => {
            element.Update();
        });

        this.drawnObjects.forEach(element => {
            element.Draw(this.context);
        });
    }

    public static getSize() : Size {
        return <Size>Canvas.instance.htmlElement;
    }

    public static getContext() : CanvasRenderingContext2D {
        return Canvas.instance.context;
    }
    
}
