import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Container } from "./Container";

export default {
  /* Данный компонент является тестовым. Основная цель - тестирование
   * компонента сетки (Panel) в режиме определения начальных условий
   * алгоритма "Клеточный автомат". Заполнение осуществляется мышью
   * при нажатой левой клавише, либо одиночным кликом. Режим обновления -
   * триггер dead/alive
   */
  title: "Application/Container",
  component: Container,
  argTypes: {
    rows: { control: "number" },
    cols: { control: "number" },
  },
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args} />
);

export const Size40x40 = Template.bind({});
Size40x40.args = {
  rows: 40,
  cols: 40,
};
