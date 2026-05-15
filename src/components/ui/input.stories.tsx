import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Type something...",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Basic: Story = {};

export const ControlledWithClear: Story = {
  render: (args) => {
    const [value, setValue] = useState("eco-shared-ui");
    return (
      <div className="w-[320px]">
        <Input
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
};
