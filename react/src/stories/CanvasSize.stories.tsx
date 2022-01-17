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
      }
    // cellWidthDenominator: {
    //     type: "number",
    // }
    // cellWidthDenominator: { control: 'number' },
    // backgroundColor: { control: 'color' },
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

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
