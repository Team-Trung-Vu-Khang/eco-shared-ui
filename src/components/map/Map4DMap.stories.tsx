import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Map4DMap } from "./Map4DMap";

const meta: Meta<typeof Map4DMap> = {
  title: "Map/Map4DMap",
  component: Map4DMap,
  tags: ["autodocs"],
  args: {
    apiKey: "",
    center: { lat: 10.7769, lng: 106.7009 },
    zoom: 12,
  },
  parameters: {
    docs: {
      description: {
        component:
          "Provide a valid Map4D API key in controls to render the map in Storybook.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Map4DMap>;

export const Basic: Story = {
  render: (args) => (
    <div className="h-[520px] w-full">
      <Map4DMap {...args}>
        <div className="pointer-events-none absolute bottom-4 left-4 rounded bg-white p-2 text-xs shadow">
          Custom Legend Overlay
        </div>
      </Map4DMap>
    </div>
  ),
};

export const WithZoomState: Story = {
  render: (args) => {
    const [zoom, setZoom] = useState<number>(args.zoom ?? 12);

    return (
      <div className="h-[520px] w-full">
        <Map4DMap
          {...args}
          zoom={zoom}
          onZoomChange={setZoom}
          onMapClick={(event) => {
            console.log("Map4D click", event);
          }}
        >
          <div className="pointer-events-none absolute right-4 top-4 rounded bg-white p-2 text-xs shadow">
            Zoom: {zoom}
          </div>
        </Map4DMap>
      </div>
    );
  },
};
