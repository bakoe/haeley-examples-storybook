// import "./styles.css"

import { CanvasSizeExample } from "./CanvasSize/canvassize-example";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
document.getElementById("app")!.innerHTML = `
<canvas id="example-canvas" style="width: 100%; height: 100%;" />
<div class="spinner" id="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`;

const canvas = document.getElementById("example-canvas") as HTMLCanvasElement;

const example = new CanvasSizeExample();
example.initialize(
  canvas,
  document.getElementById("spinner") as HTMLDivElement
);
example.enableFullscreenOnCtrlClick();
