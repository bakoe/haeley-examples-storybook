import{w as n}from"./vendor.9ee87579.js";import"rxjs";const h=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}};h();class _ extends n.exports.Initializable{showSpinner(){const e=this._spinnerElement;e&&(e.style.display="inline")}hideSpinner(){const e=this._spinnerElement;e&&(e.style.display="none")}expose(){window.canvas=this.canvas,window.context=this.canvas.context,window.controller=this.canvas.controller,window.renderer=this.renderer}initialize(e,s){this._spinnerElement=s;const l=this.onInitialize(e);return this.renderer.loadingStatus$.subscribe(i=>{i===n.exports.LoadingStatus.Finished?this.hideSpinner():i===n.exports.LoadingStatus.Started&&this.showSpinner()}),this.expose(),l}uninitialize(){this.onUninitialize()}enableFullscreenOnCtrlClick(){const e=this.canvas.element;e.addEventListener("click",s=>{s.ctrlKey&&n.exports.viewer.Fullscreen.toggle(e)})}}const o=class extends n.exports.Renderer{constructor(){super(...arguments);this._extensions=!1}onInitialize(){this._defaultFBO=new n.exports.DefaultFramebuffer(this._context,"DefaultFBO"),this._defaultFBO.initialize(),this._defaultFBO.bind();const t=this._context.gl;this._ndcTriangle=new n.exports.NdcFillingTriangle(this._context,"NdcFillingTriangle"),this._ndcTriangle.initialize();const e=new n.exports.Shader(this._context,t.VERTEX_SHADER,"ndcvertices (in-line)");e.initialize(o.SHADER_SOURCE_VERT);const s=new n.exports.Shader(this._context,t.FRAGMENT_SHADER,"pattern (in-line)");return s.initialize(o.SHADER_SOURCE_FRAG),this._program=new n.exports.Program(this._context,"CanvasSizeProgram"),this._program.initialize([e,s],!1),this._program.attribute("a_vertex",this._ndcTriangle.vertexLocation),this._program.link(),this._cellWidth=1/64,this._uCellWidth=this._program.uniform("u_cellWidth"),this.finishLoading(),!0}onUninitialize(){super.uninitialize(),this._ndcTriangle.uninitialize(),this._program.uninitialize(),this._defaultFBO.uninitialize()}onDiscarded(){this._altered.alter("canvasSize"),this._altered.alter("clearColor"),this._altered.alter("frameSize")}onUpdate(){return this._altered.any}onPrepare(){this._altered.clearColor&&this._defaultFBO.clearColor(this._clearColor),this._altered.reset()}onFrame(){const t=this._context.gl;t.viewport(0,0,this._canvasSize[0],this._canvasSize[1]),this._defaultFBO.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT,!1,!1),this._program.bind(),t.uniform1f(this._uCellWidth,this.cellWidth),this._ndcTriangle.bind(),this._ndcTriangle.draw(),this._ndcTriangle.unbind()}get cellWidth(){return this._cellWidth}set cellWidth(t){this._cellWidth=t,this.invalidate(!0)}};let c=o;c.SHADER_SOURCE_VERT=`precision lowp float;

#if __VERSION__ == 100
    attribute vec2 a_vertex;
#else
    in vec2 a_vertex;
    #define varying out
#endif

varying vec2 v_uv;

void main(void)
{
    v_uv = a_vertex * 0.5 + 0.5;
    gl_Position = vec4(a_vertex, 0.0, 1.0);
}
`;c.SHADER_SOURCE_FRAG=`precision highp float;

#if __VERSION__ == 100
    #define fragColor gl_FragColor
#else
    layout(location = 0) out vec4 fragColor;
    #define varying in
#endif

varying vec2 v_uv;

uniform float u_cellWidth;

void main(void)
{
    vec3 x3 = vec3(gl_FragCoord.x) + vec3(0.0, 1.0, 2.0);
    vec3 y3 = vec3(gl_FragCoord.y) + vec3(0.0, 1.0, 2.0);

    vec3 x = step(mod(x3, vec3(3.0)), vec3(1.0));
    vec3 y = step(mod(y3, vec3(3.0)), vec3(1.0));

    float cell = step(mod(gl_FragCoord.x * u_cellWidth + floor(gl_FragCoord.y * u_cellWidth), 2.0), 1.0);
    fragColor = vec4(mix(x, y, cell), 1.0);
}
`;class u extends _{onInitialize(e){return this._canvas=new n.exports.Canvas(e,{antialias:!1}),this._canvas.controller.multiFrameNumber=1,this._canvas.framePrecision=n.exports.Wizard.Precision.byte,this._canvas.frameScale=[1,1],this._renderer=new c,this._canvas.renderer=this._renderer,!0}onUninitialize(){this._canvas.dispose(),this._renderer.uninitialize()}get canvas(){return this._canvas}get renderer(){return this._renderer}set cellWidth(e){this._renderer.cellWidth=e}}document.getElementById("app").innerHTML=`
<canvas id="example-canvas" style="width: 100%; height: 100%;" />
<div class="spinner" id="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`;const v=document.getElementById("example-canvas"),d=new u;d.initialize(v,document.getElementById("spinner"));d.enableFullscreenOnCtrlClick();
//# sourceMappingURL=index.a997b600.js.map
