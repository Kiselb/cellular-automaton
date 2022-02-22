import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { User } from "./sn-user";

export default {
  title: "Messenger/User",
  component: User,
  argTypes: {
    email: { control: "string" },
    website: { control: "string" },
    phone: { control: "string" },
  },
} as ComponentMeta<typeof User>;

const Template: ComponentStory<typeof User> = (args) => <User {...args} />;

export const Alice = Template.bind({});
Alice.args = {
  email: "1234567890@mail.org",
  website: "www.abcde.org",
  phone: "1-123-1234567",
};
