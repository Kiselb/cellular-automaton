import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Velocity } from "./types";

export default {
  title: "Application/Velocity",
  component: Velocity,
  argTypes: {},
} as ComponentMeta<typeof Velocity>;

const Template: ComponentStory<typeof Velocity> = (args) => (
  <Velocity {...args} />
);

export const velocity = Template.bind({});
velocity.args = {};
