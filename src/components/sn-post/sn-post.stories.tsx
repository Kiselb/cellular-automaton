import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Post } from "./sn-post";

export default {
  title: "Messenger/Posts",
  component: Post,
  argTypes: {},
} as ComponentMeta<typeof Post>;

const Template: ComponentStory<typeof Post> = (args) => <Post {...args} />;

export const SomePost = Template.bind({});
SomePost.args = {
  body: "Post Body",
};
