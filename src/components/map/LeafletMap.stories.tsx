import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayersControl, TileLayer } from "react-leaflet";
import { LeafletMap } from "./LeafletMap";

const meta: Meta<typeof LeafletMap> = {
  title: "Map/LeafletMap",
  component: LeafletMap,
  tags: ["autodocs"],
  args: {
    center: [10.7769, 106.7009],
    zoom: 12,
  },
};

export default meta;
type Story = StoryObj<typeof LeafletMap>;

export const Basic: Story = {
  render: (args) => (
    <div className="h-[520px] w-full">
      <LeafletMap
        {...args}
        markers={[
          {
            id: "hcm",
            position: [10.7769, 106.7009],
            popup: "Ho Chi Minh City",
          },
        ]}
      />
    </div>
  ),
};

export const WithLayersControl: Story = {
  render: (args) => (
    <div className="h-[520px] w-full">
      <LeafletMap {...args}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Standard">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <div className="pointer-events-none absolute bottom-4 left-4 rounded bg-white p-2 text-xs shadow">
          Custom Legend Overlay
        </div>
      </LeafletMap>
    </div>
  ),
};
