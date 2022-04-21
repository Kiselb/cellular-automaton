import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { EMPTY_CELL_COLOR } from "../../domain/defaults";
import { Cell } from "./Cell";

export default {
  title: "Application/Cell",
  component: Cell,
  argTypes: {
    colorGamma: { control: "color" },
    colorEmpty: { control: "color" },
    generation: { control: "number" },
  },
} as ComponentMeta<typeof Cell>;

const Template: ComponentStory<typeof Cell> = (args) => <Cell {...args} />;

export const Dead = Template.bind({});
Dead.args = {
  generation: 0,
  row: 13,
  col: 13,
  onClick: () => console.log("OK"),
  colorEmpty: EMPTY_CELL_COLOR,
};

export const Generation1 = Template.bind({});
Generation1.args = {
  generation: 1,
  row: 13,
  col: 13,
  onClick: () => console.log("OK"),
  colorEmpty: EMPTY_CELL_COLOR,
};

export const Generation5 = Template.bind({});
Generation5.args = {
  generation: 5,
  row: 13,
  col: 13,
  onClick: () => console.log("OK"),
  colorEmpty: EMPTY_CELL_COLOR,
};

export const Generation10 = Template.bind({});
Generation10.args = {
  generation: 10,
  row: 13,
  col: 13,
  onClick: () => console.log("OK"),
  colorEmpty: EMPTY_CELL_COLOR,
};

export const Generation20 = Template.bind({});
Generation20.args = {
  generation: 20,
  row: 13,
  col: 13,
  onClick: () => console.log("OK"),
  colorEmpty: EMPTY_CELL_COLOR,
};

export const Clickable = Template.bind({});
Clickable.args = {
  generation: 1,
  row: 13,
  col: 13,
  onClick: () => alert("R13C13"),
  colorEmpty: EMPTY_CELL_COLOR,
};
