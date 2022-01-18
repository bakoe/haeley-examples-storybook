var b=Object.defineProperty;var d=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var v=(t,e,n)=>e in t?b(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,u=(t,e)=>{for(var n in e||(e={}))h.call(e,n)&&v(t,n,e[n]);if(d)for(var n of d(e))g.call(e,n)&&v(t,n,e[n]);return t};var m=(t,e)=>{var n={};for(var i in t)h.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&d)for(var i of d(t))e.indexOf(i)<0&&g.call(t,i)&&(n[i]=t[i]);return n};import{w as a,e as c,j as x,F as w,a as l,b as y,c as T,d as F,f as R,g as O,l as D,h as W,i as k,k as L,m as A,n as B,o as M,p as N,q as j,r as I,s as P,t as U}from"./vendor.6c94cbb6.js";const q=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}};q();const H={actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}};var V=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",parameters:H});class G extends a.exports.Initializable{showSpinner(){const e=this._spinnerElement;e&&(e.style.display="inline")}hideSpinner(){const e=this._spinnerElement;e&&(e.style.display="none")}expose(){window.canvas=this.canvas,window.context=this.canvas.context,window.controller=this.canvas.controller,window.renderer=this.renderer}initialize(e,n){this._spinnerElement=n;const i=this.onInitialize(e);return this.renderer.loadingStatus$.subscribe(r=>{r===a.exports.LoadingStatus.Finished?this.hideSpinner():r===a.exports.LoadingStatus.Started&&this.showSpinner()}),this.expose(),i}uninitialize(){this.onUninitialize()}enableFullscreenOnCtrlClick(){const e=this.canvas.element;e.addEventListener("click",n=>{n.ctrlKey&&a.exports.viewer.Fullscreen.toggle(e)})}}const p=class extends a.exports.Renderer{constructor(){super(...arguments);this._extensions=!1}onInitialize(){this._defaultFBO=new a.exports.DefaultFramebuffer(this._context,"DefaultFBO"),this._defaultFBO.initialize(),this._defaultFBO.bind();const t=this._context.gl;this._ndcTriangle=new a.exports.NdcFillingTriangle(this._context,"NdcFillingTriangle"),this._ndcTriangle.initialize();const e=new a.exports.Shader(this._context,t.VERTEX_SHADER,"ndcvertices (in-line)");e.initialize(p.SHADER_SOURCE_VERT);const n=new a.exports.Shader(this._context,t.FRAGMENT_SHADER,"pattern (in-line)");return n.initialize(p.SHADER_SOURCE_FRAG),this._program=new a.exports.Program(this._context,"CanvasSizeProgram"),this._program.initialize([e,n],!1),this._program.attribute("a_vertex",this._ndcTriangle.vertexLocation),this._program.link(),this._cellWidth=1/64,this._uCellWidth=this._program.uniform("u_cellWidth"),this.finishLoading(),!0}onUninitialize(){super.uninitialize(),this._ndcTriangle.uninitialize(),this._program.uninitialize(),this._defaultFBO.uninitialize()}onDiscarded(){this._altered.alter("canvasSize"),this._altered.alter("clearColor"),this._altered.alter("frameSize")}onUpdate(){return this._altered.any}onPrepare(){this._altered.clearColor&&this._defaultFBO.clearColor(this._clearColor),this._altered.reset()}onFrame(){const t=this._context.gl;t.viewport(0,0,this._canvasSize[0],this._canvasSize[1]),this._defaultFBO.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT,!1,!1),this._program.bind(),t.uniform1f(this._uCellWidth,this.cellWidth),this._ndcTriangle.bind(),this._ndcTriangle.draw(),this._ndcTriangle.unbind()}get cellWidth(){return this._cellWidth}set cellWidth(t){this._cellWidth=t,this.invalidate(!0)}};let f=p;f.SHADER_SOURCE_VERT=`precision lowp float;

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
`;f.SHADER_SOURCE_FRAG=`precision highp float;

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
`;class $ extends G{onInitialize(e){return this._canvas=new a.exports.Canvas(e,{antialias:!1}),this._canvas.controller.multiFrameNumber=1,this._canvas.framePrecision=a.exports.Wizard.Precision.byte,this._canvas.frameScale=[1,1],this._renderer=new f,this._canvas.renderer=this._renderer,!0}onUninitialize(){this._canvas.dispose(),this._renderer.uninitialize()}get canvas(){return this._canvas}get renderer(){return this._renderer}set cellWidth(e){this._renderer.cellWidth=e}}const K="_canvas_1kque_1",J="_spinnercontainer_1kque_10",X="_spinner_1kque_10";var S={canvas:K,spinnercontainer:J,spinner:X,"lds-ellipsis1":"_lds-ellipsis1_1kque_1","lds-ellipsis2":"_lds-ellipsis2_1kque_1","lds-ellipsis3":"_lds-ellipsis3_1kque_1"};const E=n=>{var i=n,{cellWidthDenominator:t=64}=i,e=m(i,["cellWidthDenominator"]);const r=c.useRef(null),s=c.useRef(null),[o,C]=c.useState(void 0);return c.useEffect(()=>{o&&(o.cellWidth=1/t)},[o,t]),c.useEffect(()=>{if(r.current){const _=new $;_.initialize(r.current,s.current||void 0),_.cellWidth=1/t,C(_)}return()=>{o&&o.uninitialize()}},[]),x(w,{children:[l("canvas",{className:S.canvas,ref:r}),x("div",{className:S.spinner,ref:s,children:[l("div",{}),l("div",{}),l("div",{}),l("div",{})]}),e.children]})};var Z={parameters:{storySource:{source:`import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CanvasSize } from "../components/CanvasSize";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/CanvasSize",
  component: CanvasSize,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    cellWidthDenominator: {
      control: "range",
    },
  },
} as ComponentMeta<typeof CanvasSize>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CanvasSize> = (args) => (
  <CanvasSize {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  // example: new CanvasSizeExample(),
  cellWidthDenominator: 64.0,
};
`,locationsMap:{default:{startLoc:{col:52,line:19},endLoc:{col:1,line:21},startBody:{col:52,line:19},endBody:{col:1,line:21}}}}},title:"Example/CanvasSize",component:E,argTypes:{cellWidthDenominator:{control:"range"}}};const Q=t=>l(E,u({},t)),z=Q.bind({});z.args={cellWidthDenominator:64};const Y=["Default"];var ee=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Z,Default:z,__namedExportsOrder:Y});const te=[k,L,A,B,M,N,j,I,P,U,V];te.forEach(t=>{Object.keys(t).forEach(e=>{const n=t[e];switch(e){case"args":case"argTypes":return D.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(n));case"decorators":return n.forEach(i=>O(i,!1));case"loaders":return n.forEach(i=>R(i,!1));case"parameters":return y(u({},n),!1);case"argTypesEnhancers":return n.forEach(i=>F(i));case"argsEnhancers":return n.forEach(i=>T(i));case"globals":case"globalTypes":{const i={};return i[e]=n,y(i,!1)}case"decorateStory":case"renderToDOM":return null;default:return console.log(e+" was not supported :( !")}})});W(()=>[ee].filter(t=>t.default),{hot:!1},!1);
//# sourceMappingURL=iframe.caf7b569.js.map
