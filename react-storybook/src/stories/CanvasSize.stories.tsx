import React from "react";
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
