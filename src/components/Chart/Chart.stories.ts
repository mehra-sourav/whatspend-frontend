import type { Meta, StoryObj } from "@storybook/react";

import ChartComponent from "./index";

const meta = {
  title: "Example/Chart",
  component: ChartComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof ChartComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Chart: Story = { args: { maxHeight: "100%", maxWidth: "100%" } };
