import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserCompany } from "./sn-user-company";

export default {
  title: "Messenger/User",
  component: UserCompany,
  argTypes: {
    name: { control: "string" },
    catchPhrase: { control: "string" },
    bs: { control: "string" },
  },
} as ComponentMeta<typeof UserCompany>;

const Template: ComponentStory<typeof UserCompany> = (args) => (
  <UserCompany {...args} />
);

export const AliceCompany = Template.bind({});
AliceCompany.args = {
  name: "Company Name",
  catchPhrase: "catchPhrase",
  bs: "bs",
};
