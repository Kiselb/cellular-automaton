import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UsersList } from "./sn-userslist";

export default {
  title: "Messenger/User",
  component: UsersList,
  argTypes: {
    userSelected: { action: "User Selected" },
  },
} as ComponentMeta<typeof UsersList>;

const Template: ComponentStory<typeof UsersList> = (args) => (
  <UsersList {...args} />
);

export const Users = Template.bind({});
Users.args = {};
