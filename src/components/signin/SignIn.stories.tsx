import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SignIn from "./SignIn";

export default {
  title: "Application/SignIn",
  component: SignIn,
  argTypes: {},
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = (args) => <SignIn />;

export const signIn = Template.bind({});
