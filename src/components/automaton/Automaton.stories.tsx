import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Automaton } from "./Automaton";

export default {
  title: "Application/Automaton",
  component: Automaton,
  argTypes: {},
} as ComponentMeta<typeof Automaton>;

const Template: ComponentStory<typeof Automaton> = (args) => (
  <Automaton {...args} />
);

export const automaton = Template.bind({});
automaton.args = {
  defAutomaton: 15,
};
