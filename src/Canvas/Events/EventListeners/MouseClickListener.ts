import { SimpleEventListener, ListenEvent, NativeEventListener } from "./SimpleEventListener";
import { Point } from "../../../CustomTypes/Point";

export class MouseClickListener extends NativeEventListener {

    protected static instance: MouseClickListener;
    protected static value: Point = null;

    public static getInstance(): ListenEvent {
        if(MouseClickListener.instance == null)
            MouseClickListener.instance = new MouseClickListener()

        return MouseClickListener.instance;
    }

    private constructor() {
        super("click");
    }

    public getValue() {
        return MouseClickListener.value;
    }

    public UpdateValue(e: MouseEvent) {
        MouseClickListener.value = {x: e.clientX, y: e.clientY}
    }

}
