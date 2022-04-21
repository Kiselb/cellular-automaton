import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./types";

export default {
  title: "Application/Buttons",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const buttonPlay = Template.bind({});
buttonPlay.args = {
  caption: "Эволюция",
  status: true,
};
export const buttonPlayInactive = Template.bind({});
buttonPlayInactive.args = {
  caption: "Эволюция",
  status: false,
};
export const buttonPause = Template.bind({});
buttonPause.args = {
  caption: "Остановить",
  status: true,
};
export const buttonFill = Template.bind({});
buttonFill.args = {
  caption: "Заполнить",
  status: true,
};
