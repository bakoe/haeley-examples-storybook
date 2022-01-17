
/* spellchecker: disable */

import {
    Canvas,
    Context,
    Controller,
    Initializable,
    LoadingStatus,
    Renderer,
    viewer,
} from 'haeley-full';

/* spellchecker: enable */

declare global {
    interface Window { 
        canvas: Canvas; 
        context: Context; 
        controller: 
        Controller; 
        renderer: Renderer 
    }
}


export abstract class Example extends Initializable {

    protected _spinnerElement: HTMLDivElement | undefined;

    /**
     * Hide the loading spinner.
     */
    protected showSpinner(): void {
        const spinnerElement = this._spinnerElement;
        if (spinnerElement) {
            (spinnerElement as HTMLElement).style.display = 'inline';
        }
    }

    /**
     * Hide the loading spinner.
     */
    protected hideSpinner(): void {
        const spinnerElement = this._spinnerElement;
        if (spinnerElement) {
            (spinnerElement as HTMLElement).style.display = 'none';
        }
    }

    protected expose(): void {

        window['canvas'] = this.canvas;
        window['context'] = this.canvas.context;
        window['controller'] = this.canvas.controller;

        window['renderer'] = this.renderer;
    }

    initialize(element: HTMLCanvasElement | string, spinnerElement?: HTMLDivElement): boolean {
        this._spinnerElement = spinnerElement;
        const result = this.onInitialize(element);

        this.renderer.loadingStatus$.subscribe((status: LoadingStatus) => {
            if (status === LoadingStatus.Finished) {
                this.hideSpinner();
            } else if (status === LoadingStatus.Started) {
                this.showSpinner();
            }
        });

        this.expose();

        return result;
    }

    uninitialize(): void {
        this.onUninitialize();
    }

    abstract onInitialize(element: HTMLCanvasElement | string): boolean;

    abstract onUninitialize(): void;

    abstract get renderer(): Renderer;

    abstract get canvas(): Canvas;

    enableFullscreenOnCtrlClick(): void {

        const e = this.canvas.element;
        e.addEventListener('click', (event) => {
            if (event.ctrlKey) { viewer.Fullscreen.toggle(e); }
        });
    }
}
