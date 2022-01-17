import CanvasSize from "../components/CanvasSize.vue";
import { ref } from "vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/CanvasSize",
  component: CanvasSize,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CanvasSize },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const canvasext = ref(null);
    const glspinner = ref(null);
    return { canvasext, glspinner, args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div>
      <canvas
        ref="canvasext"
        style="width: 100%; height: 100%;"
        v-once
      />

      <div
        ref="glspinner"
        class="glspinner"
        v-once
      >
        <div v-once></div>
        <div v-once></div>
        <div v-once></div>
        <div v-once></div>
      </div>
      
      <CanvasSize
        v-bind="args"
        v-bind:canvasref="canvasext"
        v-bind:glspinnerref="glspinner"
      />
    </div>`,
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
  cellWidthDenominator: 64.0,
};
