import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PostsList } from "./sn-postslist";

export default {
  title: "Messenger/Posts",
  component: PostsList,
} as ComponentMeta<typeof PostsList>;

const Template: ComponentStory<typeof PostsList> = (args) => (
  <PostsList {...args} />
);

export const SomePostsList = Template.bind({});
SomePostsList.args = {
  userId: 1,
};
