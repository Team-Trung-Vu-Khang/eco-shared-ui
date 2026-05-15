import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AutoCompleteSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  render: () => (
    <div className="w-[280px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const AutoComplete: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[320px]">
        <AutoCompleteSelect
          value={value}
          onChange={setValue}
          options={[
            { label: "Nong trai 01", value: "farm-1", keywords: ["north"] },
            { label: "Nong trai 02", value: "farm-2", keywords: ["south"] },
            { label: "Nong trai 03", value: "farm-3", keywords: ["east"] },
          ]}
        />
      </div>
    );
  },
};
