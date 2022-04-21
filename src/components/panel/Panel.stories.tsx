import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Panel } from "./types";
import { Cell } from "../cell/types";

export default {
  title: "Application/Panel",
  component: Panel,
  argTypes: {},
  subcomponents: { Cell },
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => <Panel {...args} />;

const mock10: number[][] = [];
for (let i = 0; i < 10; i++) {
  const row: number[] = [];
  for (let j = 0; j < 10; j++) {
    row[j] = j;
  }
  mock10[i] = row;
}

const mock40: number[][] = [];
for (let i = 0; i < 40; i++) {
  const row: number[] = [];
  for (let j = 0; j < 40; j++) {
    row[j] = j;
  }
  mock40[i] = row;
}

const mock75: number[][] = [];
for (let i = 0; i < 75; i++) {
  const row: number[] = [];
  for (let j = 0; j < 75; j++) {
    row[j] = j;
  }
  mock75[i] = row;
}

export const Size10x10 = Template.bind({});
Size10x10.args = {
  data: mock10,
};

export const Size40x40 = Template.bind({});
Size40x40.args = {
  data: mock40,
};

export const Size75x75 = Template.bind({});
Size75x75.args = {
  data: mock75,
};
