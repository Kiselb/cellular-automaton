import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SignIn from "./SignIn.page";

export default {
  title: "Application/SignIn",
  component: SignIn,
  argTypes: {},
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = () => <SignIn />;

export const signIn = Template.bind({});
