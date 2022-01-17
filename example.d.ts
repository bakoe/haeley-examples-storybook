import { Canvas, Context, Controller, Initializable, Renderer } from 'webgl-operate';
declare global {
    interface Window {
        canvas: Canvas;
        context: Context;
        controller: Controller;
        renderer: Renderer;
    }
}
export declare abstract class Example extends Initializable {
    protected _spinnerElement: HTMLDivElement | undefined;
    /**
     * Hide the loading spinner.
     */
    protected showSpinner(): void;
    /**
     * Hide the loading spinner.
     */
    protected hideSpinner(): void;
    protected expose(): void;
    initialize(element: HTMLCanvasElement | string, spinnerElement?: HTMLDivElement): boolean;
    uninitialize(): void;
    abstract onInitialize(element: HTMLCanvasElement | string): boolean;
    abstract onUninitialize(): void;
    abstract get renderer(): Renderer;
    abstract get canvas(): Canvas;
    enableFullscreenOnCtrlClick(): void;
}
