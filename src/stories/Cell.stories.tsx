import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Cell } from "./Cell";

export default {
  title: "Application/Cell",
  component: Cell,
  argTypes: {},
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const Dead = Template.bind({});
Dead.args = {
  status: "dead",
  row: 13,
  col: 13,
};

export const Alive = Template.bind({});
Alive.args = {
  status: "alive",
  row: 13,
  col: 13,
};

export const Old = Template.bind({});
Old.args = {
  status: "old",
  row: 13,
  col: 13,
};

export const OldClickable = Template.bind({});
OldClickable.args = {
  status: "old",
  row: 13,
  col: 13,
  onClick: () => alert("R13C13"),
};
