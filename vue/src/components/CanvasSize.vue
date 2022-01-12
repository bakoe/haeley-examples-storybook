<script lang="ts">
import { ref, onMounted } from "vue";
import { CanvasSizeExample } from "./CanvasSize/canvassize-example";

export default {
  setup() {
    const canvas = ref(null);
    const glspinner = ref(null);

    onMounted(() => {
      if (canvas && glspinner) {
        const element = canvas.value;
        const spinnerElement = glspinner.value;

        const example = new CanvasSizeExample();
        if (element) {
          example.initialize(element, spinnerElement || undefined);
          example.enableFullscreenOnCtrlClick();
        }
      }
    });

    return {
      canvas,
      glspinner
    };
  },
};
</script>

<template>
  <div>
    <canvas ref="canvas" />

    <div ref="glspinner" class="glspinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}

/**
 * CSS-only loading spinner provided by https://loading.io/css/
 */

.glspinnercontainer {
  position: relative;
}

.glspinner {
  display: inline;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 80px;
  height: 80px;

  z-index: 20;
}
.glspinner div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #333a40;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  z-index: 20;
}
.glspinner div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.glspinner div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.glspinner div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.glspinner div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
