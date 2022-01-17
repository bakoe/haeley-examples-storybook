<script lang="ts">
// import { ref, onMounted } from "vue";
import { CanvasSizeExample } from "./CanvasSize/canvassize-example";

// let example = undefined as CanvasSizeExample | undefined;

export default {
  data() {
    return {
      example: undefined as CanvasSizeExample | undefined,
    };
  },
  props: {
    cellWidthDenominator: Number,
    canvasref: HTMLCanvasElement,
    glspinnerref: HTMLDivElement,
  },
  watch: {
    cellWidthDenominator: {
      immediate: true,
      handler(newValue) {
        if (this.example) {
          this.example.cellWidth = 1.0 / newValue;
        }
      },
    },
  },
  beforeUnmount() {
    console.log("unmounting now …");
    console.log(this.example);
  },
  unmounted() {
    console.log("unmounted now …");
    console.log(this.example);
  },
  beforeUpdate() {
    console.log("beforeUpdate");
    console.log(this.example);
  },
  beforeMount() {
    console.log("beforeMount");
    console.log(this.example);
  },
  mounted() {
    console.log("mounted");
    console.log(this.example);
  },
  updated() {
    // const glspinner = this.$refs.glspinner;
    const glspinner = this.glspinnerref;
    const canvasref = this.canvasref;
    console.log(glspinner);
    console.log(canvasref);

    if (canvasref && glspinner) {
      if (!this.example) {
        console.log("Creating new example");

        const exampleInstance = new CanvasSizeExample();
        exampleInstance.initialize(canvasref, glspinner || undefined);
        exampleInstance.enableFullscreenOnCtrlClick();

        exampleInstance.cellWidth = 1.0 / this.$props.cellWidthDenominator;

        this.example = Object.assign({}, this.example, exampleInstance);

        console.log(this.example);
      }
    }
  },
  // setup(props) {
  //   const canvas = ref(null);
  //   const glspinner = ref(null);

  //   console.log(props.canvasref);

  //   // console.log((this as any).$parent.$refs.canvasref);

  //   onMounted(() => {
  //     console.log("onMounted");
  //     console.log(props.canvasref);
  //     // console.log((this as any).$parent.$refs.canvasref);
  //     // if (canvas && glspinner) {
  //     if (glspinner) {
  //       // const element = canvas.value;
  //       const element = props.canvasref;
  //       const spinnerElement = glspinner.value;

  //       if (!example) {
  //         example = new CanvasSizeExample();
  //         if (element) {
  //           example.initialize(element, spinnerElement || undefined);
  //           example.enableFullscreenOnCtrlClick();
  //         }
  //       }
  //     }
  //   });

  // return {
  //   canvas,
  //   glspinner,
  // };
  // },
};
</script>

<template>
  <div>
    <!-- <h1>{{ canvasref }}</h1>

    <canvas ref="canvas" />

    <div ref="glspinner" class="glspinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div> -->
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
