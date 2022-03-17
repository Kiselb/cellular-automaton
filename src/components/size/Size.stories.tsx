import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Size } from "./Size";

export default {
  title: "Application/Size",
  component: Size,
  argTypes: {},
} as ComponentMeta<typeof Size>;

const Template: ComponentStory<typeof Size> = (args) => <Size {...args} />;

export const SizeX_10_20 = Template.bind({});
SizeX_10_20.args = {
  minSize: 10,
  maxSize: 20,
};
