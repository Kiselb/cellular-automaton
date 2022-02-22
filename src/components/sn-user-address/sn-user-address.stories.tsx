import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UserAddress } from "./sn-user-address";

export default {
  title: "Messenger/User",
  component: UserAddress,
  argTypes: {
    address: { control: "string" },
    street: { control: "string" },
    suite: { control: "string" },
    city: { control: "string" },
    zipcode: { control: "string" },
  },
} as ComponentMeta<typeof UserAddress>;

const Template: ComponentStory<typeof UserAddress> = (args) => (
  <UserAddress {...args} />
);

export const AliceAddress = Template.bind({});
AliceAddress.args = {
  street: "street",
  suite: "suite",
  city: "city",
  zipcode: "zipcode",
};
